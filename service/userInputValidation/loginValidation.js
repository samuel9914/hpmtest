const { body } = require('express-validator');


const loginValidationBodyRules = [
    body('username', 'username is required').exists(),
    body('password', 'password is required').exists(),
    body('username', 'login is required').trim().notEmpty(),
    body('password', 'password is required').trim().notEmpty(),
    body('username').escape(),
    body('password').escape()]

module.exports = loginValidationBodyRules;