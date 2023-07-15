
const dbConfig = require('../config/database/mysql.js');
const Sequelize = require('sequelize');

const sequilize = new Sequelize(dbConfig.DATABASE,
                                dbConfig.USER,
                                dbConfig.PASSWORD,
                                {
                                    host: dbConfig.HOST,
                                    dialect: dbConfig.DIALECT
                                });

const db  ={};

db.sequilize  = sequilize;
db.models = {};
db.models.User = require('./user')(sequilize,Sequelize.DataTypes)

module.exports = db;