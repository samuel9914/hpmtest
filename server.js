const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const sequelize = require("sequelize");
const db = require('./model');


const userRouter = require('./route/user');

app.use(express.json());


(async () =>{
  await db.sequilize.sync();
})();

//endpoint user
app.use('/users',userRouter);


app.listen(3000)