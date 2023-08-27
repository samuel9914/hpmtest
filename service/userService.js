const {models:{User}} = require('../config');
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');

const userService = {
    //update profile mechanism
    updateProfile : async(req,res)=> {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const userData = matchedData(req);
        try{

          
            //updating profile for the given username
            await User.update(
                {    email : userData.email,
                     name :userData.name,
                     gender : userData.gender  },
                     {
                         where : {id: req.session.passport.user}
                    }
             )
            res.status(201).send("berhasil update profil");
        }
        catch(e){
            res.status(500).send(e);
        }

    },

    //create user mechanism
    register: async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const userData = matchedData(req);
        
        //username duplication check
        const user = await User.findOne({where : {username: userData.username}})

        if(user != null){
            return res.status(409).send("username sudah digunakan");
        }

        try {
            
            const salt = await bcrypt.genSalt(Number(process.env.SALT_LENGTH)) //generate salt for password hashing
        
            const hashedPassword = await bcrypt.hash(userData.password,salt) 
          
            //new entry with hashed password
             await User.create({
                username:userData.username,
                password: hashedPassword,
                name:userData.name,
                email:userData.email,
                gender:userData.gender
            });
            return res.status(201).send("Account created");
        
        }
        catch(e){
            return res.status(500).send(e);
        }
    },

    //login mechanism
    login: async(req,res,next) => {
    
        try{ 
            req.passport.authenticate('local', function(err, user, info) {
                if (err) {  return next(err); } //error exception
                //if authentication failed user object value is false
                if (!user) {
                    return res.status(401).json(info); 
                } else {
                    //maintain session
                    req.logIn(user, function() {
                        
                        return res.status(200).send("login sukses");
                    })
                }    
        })(req,res,next);
        }
        catch(e){
            res.status(500).send(e);
        }
      }
    }
    module.exports = userService
