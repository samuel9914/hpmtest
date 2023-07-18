const {models:{User,UserProfile}} = require('../config');
const bcrypt = require('bcrypt');

module.exports = (passport) =>{


    let userService = {
  

    

    //mekanisme update profil
    updateProfile: async(req,res)=> {
        
        const email=req.body.email.toUpperCase();
        const name = req.body.name.toUpperCase();
        const gender = req.body.gender.toUpperCase();


        //validasi email terisi atau tidak
        if(email==null || email=='' ){
            return res.status(409).send("Email tidak boleh kosong")

        }
        //validasi format email
        else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){
            return res.status(422).send("Email yang diberikan tidak sesuai format")
        }
        //validasi panjang field email
        else if(email.length>255){
            return res.status(422).send("email harus kurang dari 255 karakter");
        }

        //validasi nama terisi atau tidak
        if(name==null || name=='' ){
            return res.status(409).send("nama tidak boleh kosong")

        }
        //validasi panjang field nama
        else if(name.length>255){
            return res.status(422).send("nama harus kurang dari 255 karakter");
        }

        //validasi field gender terisi atau tidak
        if(gender==null || gender=='' ){
            return res.status(409).send("gender tidak boleh kosong")
        }

        //limitasi input untuk field gender
        if(gender.toUpperCase() != 'MALE' && req.body.gender.toUpperCase() != 'FEMALE' ){
           return  res.status(422).send("gender harus male atau female")
        }

      
        try{

          
            //melakukan update didatabase untuk username yang diberikan
            const aa = await UserProfile.update(
                {    email : req.body.email,
                     name : req.body.name,
                     gender : req.body.gender  },
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

        const { username, password} = req.body;

        //Validasi input username dan password saat registrasi
        if(!username || !password || username.trim() == '' || password.trim() == ''){
            return res.status(400).send("username dan password tidak boleh kosong");
        }
        else if(password.length <= 8){
            return res.status(422).send("password harus lebih dari 8 karakter");
        }
        else if(/^[A-Z]+$/.test(password) ){
            return res.status(422).send("password harus mengandung huruf kecil");
        }
        else if(/^[a-z]+$/.test(password) ){
            return res.status(422).send("password harus mengandung huruf kapital");
        } 
        else if(!/\d/.test(password)){
            return res.status(422).send("password harus mengandung angka");
        }
        else if(password == username){
            return res.status(422).send("username dan password harus berbeda");
        }
      
        //pengecekan duplikasi username 
        const user = await User.findOne({where : {username: username}})
        if(user != null){
            return res.status(409).send("username sudah digunakan");
        }

        try {
            
            const salt = await bcrypt.genSalt(10) //generate salt untuk hashing password
            const hashedPassword = await bcrypt.hash(password,salt) 
           
            //membuat entry baru meenggunakan hashed password
            await User.create({
                username,
                password: hashedPassword
            });

            //membuat entry pada table UserProfile dengan username yg sama,
            await UserProfile.create({
                name:'',
                username,
                email:'',
                gender:''
            });

            return res.status(201).send("Akun berhasil dibuat");
        
        }
        catch{
            return res.status(500).send();
        }
    },


    //response login ketika berhasil
    login: async(req,res,next) => {
        console.log("ada didalam login");
      
        try{ 
            passport.authenticate('local', function(err, user, info) {
          
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
    return userService;
}