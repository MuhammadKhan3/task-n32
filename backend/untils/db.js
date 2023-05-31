const { Sequelize } = require('sequelize');
const dotenv=require('dotenv')
dotenv.config()
const {databaseName,password,user}=process.env;
console.log(databaseName,password,user);

const sequelize =
 new Sequelize(databaseName, user, password, {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports=sequelize;