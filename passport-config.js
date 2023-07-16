const {models:{User}} = require('./model');


const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

 function  initialize(passport,getUserByUsername,getUserById) {
  const authenticateUser = async (username, password, done) => {
    //const user = getUserByUsername(username);
    const user = await User.findOne({where : {username: username}})

    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      
      
      if (await bcrypt.compare(password, user.password)) {
     // if (true) {
        
        return done(null, user,{ message: 'Login successful ' })
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }
 
  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  
  console.log('done');
  passport.serializeUser((user, done) => done(null, user.id))

  
  passport.deserializeUser((id, done) => {
    return done(null,true)
  })
}

module.exports = initialize