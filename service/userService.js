const {models:{User}} = require('../config');
const bcrypt = require('bcrypt');
const registerValidator = require('./userInputValidation/registerValidation');
const updateProfileValidator = require('./userInputValidation/updateProfileValidation.js');

const userService = {
  
    //mekanisme update profil
    updateProfile : async(req,res)=> {
        
        

        updateProfileValidator.isValid(req,res);
        const email = req.body.email.trim().escape();
        const name = req.body.name.trim().escape();
        const gender = req.body.gender.trim().escape().toUpperCase();
        try{

            console.log(req.session.passport.user);
            //melakukan update didatabase untuk username yang diberikan
            await User.update(
                {    email : email,
                     name : name,
                     gender : gender  },
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

    //mekanisme membuat user baru
    register: async(req,res) => {

       
        registerValidator.isValid(req,res);
        updateProfileValidator.isValid(req,res);

        const username = req.body.username.trim().escape();
        const password = req.body.password.trim().escape();
        const email = req.body.email.trim().escape();
        const name = req.body.name.trim().escape();
        const gender = req.body.gender.trim().escape().toUpperCase();
        

     
        //pengecekan duplikasi username 
        const user = await User.findOne({where : {username: username}})

        if(user != null){
            return res.status(409).send("username sudah digunakan");
        }

        try {
            
            const salt = await bcrypt.genSalt(Number(process.env.SALT_LENGTH)) //generate salt untuk hashing password
        
            const hashedPassword = await bcrypt.hash(password,salt) 
    
            //membuat entry baru meenggunakan hashed password
             await User.create({
                username,
                password: hashedPassword,
                name:name,
                email:email,
                gender:gender
            });
         

            return res.status(201).send("Akun berhasil dibuat");
        
        }
        catch(e){
            return res.status(500).send(e.errors[0].message);
        }
    },

    //response login ketika berhasil
    login: async(req,res,next) => {
       
         try{ 
            req.passport.authenticate('local', function(err, user, info) {
          
                if (err) { return next(err); } //error exception

                //cek user terisi atau tidak, terisi false bila gagal
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
 module.exports = userService;