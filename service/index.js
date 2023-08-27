const controllers = {};

controllers.userController = require('./userService');
controllers.registerValidator = require('./userInputValidation/registerValidation');
controllers.updateProfileValidator = require('./userInputValidation/updateProfileValidation');
controllers.loginValidator = require('./userInputValidation/loginValidation');
module.exports = controllers;