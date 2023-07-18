const {models:{User}} = require('./config');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function  initialize(passport) {


  const getUserById = async (id,done)=>{
    try {
      const user = await User.findOne({where : {id: id}});
      if (user == null) {
        done(null, false, { message: 'No user with that username' })
      }
    }
    catch(e){
      done(null,false,{message: e.message});
    }

  }

  const authenticateUser = async (username, password, done) => { 
    console.log('masuk authUser');
    console.log(username,password); 
    try {
      const user = await User.findOne({where : {username: username}});
      if (user == null) {
        return done(null, false, { message: 'Username tidak ditemukan' })
      }
        
      if (await bcrypt.compare(password, user.password)) {
        console.log("login success");
        return done(null, user,{ message: 'Login sukses' });
        
      } 
      else {
        return done(null, false, { message: 'Password salah' })
      }

    } 
    catch (e) {
        return done(e)
    }
  }
  
  passport.use(new LocalStrategy( authenticateUser));
 
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  
  passport.deserializeUser((id, done) => {
    done(null,getUserById(id));
  })

}

module.exports = initialize;