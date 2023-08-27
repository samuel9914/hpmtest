

const authCheck = {
    //validating authenticated user
    checkAuthenticated: (req, res, next) =>{
        if (req.isAuthenticated()) {
          return next();
        }
        return res.status(401).send("Not Authenticated");
    },
     
    //validating not authenticated user
    checkNotAuthenticated: (req, res, next)=> {
        if (req.isAuthenticated()) {
          return res.status(200).send("Authenticated");
        }
    
        next();
    }
    


}

module.exports = authCheck