const Verify = require('./model/verification');
const {Sequelize} = require('sequelize');
require('dotenv').config();

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
      email: "kiledar.ay@northeastern.edu",
      send_time: new Date(),
    }
    
    try{
        credentials.sync({});
        console.log("Table created");
    }
    catch(err){
        console.log("Table creation error");
    }
  const verification = await Schema.create(obj);
}

tracking();