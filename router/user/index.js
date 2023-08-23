//entry point route

<<<<<<< HEAD
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
=======
// remove unsed imports and dependencies
module.exports = (app, passport) => {
  const express = require("express");
  const router = express.Router();
  const { userController } = require("../../service");
  const basicAuth = require("express-basic-auth");

  //fungsi untuk validasi user yang sudah terautentikasi
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).send("Belum terautentikasi");
  }

  //fungsi untuk validasi user belum terautentikasi
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.status(200).send("Sudah terautentikasi");
    }
    console.log("belum terautentikasi");
    next();
  }
>>>>>>> master

  //routing untuk registrasi
  router.post(
    "/register/",
    checkNotAuthenticated,
    //This can lead to tight coupling between your routes and the passport module.
    //Consider finding an alternative way to handle authentication in your controllers without passing the passport object.
    userController(passport).register
  );

  //routing untuk login
  router.post("/login", checkNotAuthenticated, userController(passport).login);
  //routing untuk registrasi
  router.post('/register/',authCheck.checkNotAuthenticated,userController.register);
  
  //routing untuk login
  router.post('/login',authCheck.checkNotAuthenticated, userController.login );  

  //routing untuk update profile
  router.put(
    "/updateProfile",
    checkAuthenticated,
    userController(passport).updateProfile
  );
  app.use(router);
  return router;
};
  //routing untuk update profile
  router.put('/updateProfile',authCheck.checkAuthenticated,userController.updateProfile );
  app.use(router);
  return router;
}



