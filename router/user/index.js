//entry point route

module.exports= (app)=>{
  const express = require('express');
  const router = express.Router();
  const {userController} = require('../../service');
  const authCheck = require('./authCheck');

  //routing untuk registrasi
  router.post('/register/',authCheck.checkNotAuthenticated,userController.register);
  
  //routing untuk login
  router.post('/login',authCheck.checkNotAuthenticated, userController.login );  

  //routing untuk update profile
  router.put('/updateProfile',authCheck.checkAuthenticated,userController.updateProfile );
  app.use(router);
  return router;
}



