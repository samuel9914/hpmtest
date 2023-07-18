//entry point route

module.exports= (app,passport)=>{
const express = require('express');
const router = express.Router();
const {userController} = require('../../service');
const basicAuth = require('express-basic-auth')

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




//routing entry endpoint 
router.get('/',checkAuthenticated,userController(passport).getAllUsers);

//routing untuk registrasi
router.post('/register/',checkNotAuthenticated,userController(passport).register);
 
//routing untuk login
router.post('/login',checkNotAuthenticated, userController(passport).login );  
  
//routing untuk mengambil seluruh data profil
router.get('/profiles',checkAuthenticated,userController(passport).getAllProfiles);

//routing untuk update profile
router.put('/updateProfile',checkAuthenticated,userController(passport).updateProfile );
app.use(router);
return router;
}



