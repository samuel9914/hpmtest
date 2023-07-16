const express = require('express');
const router = express.Router();
const {userController} = require('../../service');
const passport = require('passport');

const initializePassport = require('../../passport-config');
const { updateProfile } = require('../../service/userService');

   initializePassport(
  passport,
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)
  //async username =>  await User.findOne({where : {username: username}})
) 



function checkAuthenticated(req, res, next) {
    console.log('luar if')
    if (req.isAuthenticated()) {
      console.log('dalam if');
      return next()
    }
    console.log('redirected');
    res.redirect('/login')
}
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}


router.use(passport.initialize());
router.use(passport.session());

router.get('/',checkAuthenticated,userController.getAllUsers);

router.post('/register/',checkNotAuthenticated,userController.create);
 

 router.post('/login', passport.authenticate('local',
{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));  

router.get('/profiles',checkAuthenticated,userController.getAllProfiles);
router.put('/updateProfile',checkAuthenticated,userController.updateProfile );

router.post('/updateProfile',checkAuthenticated,userController.updateProfile );

//router.post('/login/',userController.login);
//router.post('./login',passport.authenticate('local'))

module.exports=router;
