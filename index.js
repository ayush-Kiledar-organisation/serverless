const functions = require('@google-cloud/functions-framework');
const Mailgun = require('mailgun.js');
const FormData = require('form-data');
require('dotenv').config();

const API_KEY = process.env.API_KEY
const DOMAIN = process.env.DOMAIN

functions.cloudEvent('helloPubSub', cloudEvent => {
  const base64name = cloudEvent.data.message.data;

  const name = base64name
    ? Buffer.from(base64name, 'base64').toString()
    : 'World';

  const payload = JSON.parse(name);

  const mailgun = new Mailgun(FormData).client({
    username: 'api',
    key: API_KEY,
    });

  const mailFunc = async () => {
    await mailgun.messages.create(DOMAIN, {
        to: payload.email,
        from: 'ayushkiledar10@gmail.com',
        subject: 'User Account Verification- Webapp',
        text: "Welcome. To access your account, verify your email with this link: http://ayush-kiledar-webapp:3000/verify?token="+payload.id+"&time="+payload.time
    });
    }
    mailFunc();
});
