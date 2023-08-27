const rateLimit = require('express-rate-limit')
const {loginLimiterConfig,registerLimiterConfig} = require('../../config/rateLimiterConfig.js')

module.exports= (app)=>{

  const express = require('express');
  const router = express.Router();
  const {userController,registerValidator,updateProfileValidator,loginValidator} = require('../../service');
  const authCheck = require('./authCheck');
  const registerLimiter = rateLimit(registerLimiterConfig);
  const loginLimiter = rateLimit(loginLimiterConfig);
  //routing untuk registrasi
  router.post('/register/',registerLimiter,authCheck.checkNotAuthenticated,registerValidator,updateProfileValidator,userController.register);
  
  //routing untuk login
  router.post('/login',loginLimiter,authCheck.checkNotAuthenticated,loginValidator, userController.login );  

  //routing untuk update profile
  router.put('/updateProfile',authCheck.checkAuthenticated,updateProfileValidator,userController.updateProfile );
  app.use(router);
  return router;
}







