const {models:{User,UserProfile}} = require('../model');


const bcrypt = require('bcrypt');





module.exports = {


    getAllUsers: async(req,res)=> {

        users = await User.findAll({});
        res.status(200).send(users);


    },


    
    getAllProfiles: async(req,res)=> {

        profiles = await UserProfile.findAll({});
        res.status(200).send(profiles);


    },


    updateProfile: async(req,res)=> {

        
        console.log(req.body);
        if(req.body.email==null || req.body.email=='' ){
            console.log('inside update profile1');
            res.status(409).send("Email tidak boleh kosong")

        }
        if(req.body.name==null || req.body.name=='' ){
            console.log('inside update profile2');
            res.status(409).send("nama tidak boleh kosong")

        }
        if(req.body.gender==null || req.body.gender=='' ){
            console.log('inside update profile3');
            res.status(409).send("gender tidak boleh kosong")
        }
        if(req.body.gender.toLowerCase() != 'male' && req.body.gender.toLowerCase() != 'female' ){
            console.log('inside update profile4');
            res.status(409).send("gender harus male atau female")
        }


        console.log('after validation')

      
        try{
            const aa = await UserProfile.update(
                {    email : req.body.email,
                     name : req.body.name,
                     gender : req.body.gender  },
                     {
                         where : {username: req.body.username}
                     }
     
     
             )
             console.log(aa+"1");
             res.status(201).send({    email : req.body.email,
                 name : req.body.name,
                 gender : req.body.gender  }
                 );

            console.log(aa+"2");


        }
        catch{
            res.status(500).send()
        }
        


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


                await UserProfile.create({
                    name:'',
                    username,
                    email:'',
                    gender:''
                    

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