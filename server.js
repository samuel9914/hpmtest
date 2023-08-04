if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const sequelize = require("sequelize");
const db = require('./config');
const flash = require('express-flash');
const session = require('express-session');
const rateLimit = require('express-rate-limit')


const {models:{User}} = require('./config');

const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser');

const passport = require('passport');

require('./passport-config')(passport);



//konfigurasi limiter 100 request per 15 menit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 50, 
	standardHeaders: true, 
	legacyHeaders: false, 
})

//apply limitasi request
app.use(limiter)

app.use(basicAuth({
  users: { 'admin': 'sangataman' }
}));


app.use(bodyParser.json()); // support json encoded bodies

app.use(express.json());
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

//inisiasi objek passport ke request yang masuk
app.use(passport.initialize());
//middleware untuk authentikasi menggunakan session
app.use(passport.session());

//sync db
(async () =>{
  await db.sequilize.sync();
})();


let userRouter = require('./router/user')(app,passport);
app.use('/users',userRouter);

app.listen(3000)