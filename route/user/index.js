const express = require('express');
const router = express.Router();
const {userController} = require('../../controller');

router.get('/',userController.getAllUsers);

router.post('/register/',userController.create);

router.post('/login/',userController.login);


module.exports=router;