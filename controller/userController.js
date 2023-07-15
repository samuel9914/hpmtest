const {models:{User}} = require('../model');

const bcrypt = require('bcrypt');

module.exports = {


    getAllUsers: async(req,res)=> {

        users = await User.findAll({});
        res.status(200).send(users);


    },

    create: async(req,res) => {

        if(req.body.username && req.body.password){

            const { username, password} = req.body;
            console.log('executed controller');
            try {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password,salt) 
               // console.log(salt)
                console.log(hashedPassword)
                
                await User.create({
                    username,
                    password: hashedPassword
                });

                res.status(201).send()
            
              }
              catch{
                res.status(500).send()
              }

        }

    },

    login: async(req,res) => {

        const username = req.body.username;
        const user = await User.findOne({where : {username: username}})

        if (user ==null){

            return res.status(400).send('Cannot find user')
        }
        try {
            if(await bcrypt.compare(req.body.password,user.password)){
            res.send('Login Success')
            }else{
            res.send('Wrong password')
            }

        } catch{
            res.status(500).send()
        } 


    }


}