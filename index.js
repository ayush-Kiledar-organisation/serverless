const functions = require('@google-cloud/functions-framework');
const mailgun = require('mailgun-js');
const Verify = require('./model/verification');
const {Sequelize} = require('sequelize');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;

functions.cloudEvent('helloPubSub', cloudEvent => {
  const base64name = cloudEvent.data.message.data;

  const name = base64name
    ? Buffer.from(base64name, 'base64').toString()
    : 'World';

  const payload = JSON.parse(name);
  var verification;

  const mailgunClient = mailgun({
    apiKey: process.env.API_KEY,
    domain: process.env.DOMAIN
    });

  const tracking = async() =>{
      const credentials = new Sequelize(

        process.env.db_database,
        process.env.db_username, 
        process.env.db_password,{
        host: process.env.db_host,
        dialect: 'mysql',
        logging: false
    });

      const Schema = credentials.define('verify',Verify);

      const obj = {
        email: payload.email,
        send_time: new Date(),
      }

      try{
        await credentials.sync({});
      }
      catch(err){
          console.log("Table creation error: "+err);
      }

      verification = await Schema.create(obj);
      console.log(verification)
  }

  const mailFunc = async () => {
      try{
          await mailgunClient.messages().send({
          to: payload.email,
          from: 'ayushkiledar10@gmail.com',
          subject: 'User Account Verification- Webapp',
          html: `Welcome. To access your account, verify your email with this link: ${payload.url}?token=${payload.id}. This link will expire in 2 minutes. We hope you enjoy our services.`
      });
      }
      catch(err){
        console.log("Mailing error: "+err);
      }
    }
    tracking();
    mailFunc();
});
