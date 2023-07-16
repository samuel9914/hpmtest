if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const sequelize = require("sequelize");
const db = require('./model');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const userRouter = require('./route/user');

const {models:{User}} = require('./model');

/* const initializePassport = require('./passport-config');

   initializePassport(
  passport,
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)
  //async username =>  await User.findOne({where : {username: username}})
) 
  */
const users = [];

app.use(express.json());
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


/* 
app.use(passport.initialize());
app.use(passport.session()); */

(async () =>{
  await db.sequilize.sync();
})();

//endpoint user
/*  app.post('/login', passport.authenticate('local',
                                                              {
                                                                successRedirect: '/',
                                                                failureRedirect: '/login',
                                                                failureFlash: true
                                                              }));  */
app.use('/users',userRouter);




app.listen(3000)