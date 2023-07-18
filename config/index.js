
const dbConfig = require('../credential/database/mysql.js');
const Sequelize = require('sequelize');

//koneksi ke db
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
db.models.User = require('./userConfig.js')(sequilize,Sequelize.DataTypes);
db.models.UserProfile = require('./userProfileConfig.js')(sequilize,Sequelize.DataTypes);
module.exports = db;