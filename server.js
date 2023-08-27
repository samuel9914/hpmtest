if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const db = require('./config');
const flash = require('express-flash');
const session = require('express-session');
const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const https = require("https");
const fs = require("fs");


require('./config/passport-config')(passport);




//apply helmet for setting up proper HTTP headers
app.use(helmet())
//reducing fingerprinting
app.disable('x-powered-by')

app.use(basicAuth({
  users: { 'admin': process.env.basicAuthPassword }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies

app.use(express.json());
app.use(flash());

//setting up session
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name:process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: true,
    httpOnly: true,
    expires: expiryDate
  }
}));

//initiating object passport
app.use(passport.initialize());
app.use(passport.session());

//sync db
(async () =>{
  await db.sequilize.sync();
})();


let userRouter = require('./router/user')(app);

//injecting passport to req object
app.use('/users',(req, res, next)=> {
                                      req.passport = passport;
                                      next();
                                    })
app.use('/users',userRouter);

//custom notfound handler
app.use((req, res, next) => {
  res.status(404).send("Not found!");
})

//setting up https option
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

https.createServer(options, app)
.listen(3000, function (req, res) {
  console.log("Server started at port 3000");
});
//app.listen(3000)