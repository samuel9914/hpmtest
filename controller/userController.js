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
            res.status(409).send("Email tidak boleh kosong")

        }
        if(req.body.name==null || req.body.name=='' ){
            res.status(409).send("nama tidak boleh kosong")

        }
        if(req.body.gender==null || req.body.gender=='' ){
            res.status(409).send("gender tidak boleh kosong")
        }
        if(req.body.gender.toLowerCase() != 'male' && req.body.gender.toLowerCase() != 'female' ){
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

        const { username, password} = req.body;


        if(!username || !password || username.trim() == '' || password.trim() == ''){
            return res.status(409).send("username dan password tidak boleh kosong");
        }


        if(password.length <= 8){
            return res.status(409).send("password harus lebih dari 8 karakter");
        }
           else if(/^[A-Z]+$/.test(password) ){
            return res.status(409).send("password harus mengandung huruf kecil");

        }
        else if(/^[a-z]+$/.test(password) ){
            return res.status(409).send("password harus mengandung huruf kapital");

        } 
        else if(!/\d/.test(password)){
            return res.status(409).send("password harus mengandung angka");
        }
       // (?=.*\d)(?=.*[a-z])(?=.*[A-Z])
      

        const user = await User.findOne({where : {username: username}})
        if(user != null){
            return res.status(409).send("username sudah digunakan");
        }
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

            return res.status(201).send()
        
            }
            catch{
                return res.status(500).send()
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