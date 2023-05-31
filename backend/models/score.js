const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../untils/db')

const Score=sequelize.define('score',{
    point:{
        type:DataTypes.INTEGER,
    },
    uniqueNo:{
        type:DataTypes.STRING,
    },

},{
    timestamps:true,
})

module.exports =Score