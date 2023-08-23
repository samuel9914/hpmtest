const {models:{User}} = require('.');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function  initialize(passport) {


  const getUserById = async (id)=>{
    try {
      const user = await User.findOne({where : {id: id}});
      if (user == null) {
        return false;
      }
      
      return user;
    }
    catch(e){
      res.status(500).send(e.errors[0].message);
    }

  }

  const authenticateUser = async (username, password, done) => { 

    try {
      const user = await User.findOne({where : {username: username}});
      if (user == null) {
        return done(null, false, { message: 'Username tidak ditemukan' })
      }
        
      if (await bcrypt.compare(password, user.password)) {
      
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