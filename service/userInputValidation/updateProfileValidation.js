const { body } = require('express-validator');


const updateProfileValidationBodyRules = [
    body('email', 'Email is required').exists(),
    body('name', 'Name is required').exists(),
    body('gender', 'Gender is required').exists(),
    body('username', 'Email is required').trim().notEmpty(),
    body('name', 'Name is required').trim().notEmpty(),
    body('gender', 'Gender is required').trim().exists(),
    body('email', 'Email at Max 255 Characters').isLength({ max: 255 }),
    body('name', 'Name at Max 255 Characters').isLength({ max: 255 }),
    body('email', 'Must use standard email format').isEmail(),
    body('gender', 'Gender must be MALE or FEMALE').isIn(['MALE','FEMALE']),
    body('email').escape(),
    body('name').escape(),
    body('gender').escape()
]

module.exports =  updateProfileValidationBodyRules;


