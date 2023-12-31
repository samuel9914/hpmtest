const { body } = require('express-validator');


const registrationValidationBodyRules = [
    body('username', 'username is required').exists(),
    body('password', 'password is required').exists(),
    body('username', 'login is required').trim().notEmpty(),
    body('password', 'password is required').trim().notEmpty(),
    body('password', 'Password Must Be at Least 8 Characters').isLength({ min: 8 }),
    body('password', 'Password Must Contain an Uppercase Letter').matches('[A-Z]'),
    body('password', 'Password Must Contain an Lowercase Letter').matches('[a-z]'),
    body('username').escape(),
    body('password').escape()]

module.exports = registrationValidationBodyRules;