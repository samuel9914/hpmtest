

const authCheck = {
    //fungsi untuk validasi user yang sudah terautentikasi
    checkAuthenticated: (req, res, next) =>{
        if (req.isAuthenticated()) {
          return next();
        }
        return res.status(401).send("Belum terautentikasi");
    },
     
    //fungsi untuk validasi user yang belum terautentikasi
    checkNotAuthenticated: (req, res, next)=> {
        if (req.isAuthenticated()) {
          return res.status(200).send("Sudah terautentikasi");
        }
    
        next();
    }
    


}

module.exports = authCheck