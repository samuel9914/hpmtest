

function isValid(req,res){
    const { username, password} = req.body;


    //Validasi input username dan password saat registrasi
    if(typeof username != 'string' && Object.prototype.toString.call(username) != '[object String]'){
        return res.status(400).send("tipe data username harus string");
    }
    else if(typeof password != 'string' && Object.prototype.toString.call(password) != '[object String]'){
        return res.status(400).send("tipe data password harus string");
    }
    else if(!username || !password || username.trim() == '' || password.trim() == ''){
        return res.status(400).send("username dan password tidak boleh kosong");
    }
    else if(password.length <= 8){
        return res.status(422).send("password harus lebih dari 8 karakter");
    }
    else if(/^[A-Z]+$/.test(password) ){
        return res.status(422).send("password harus mengandung huruf kecil");
    }
    else if(/^[a-z]+$/.test(password)){
        return res.status(422).send("password harus mengandung huruf kapital");
    } 
    else if(!/\d/.test(password)){
        return res.status(422).send("password harus mengandung angka");
    }
    else if(password == username){
        return res.status(422).send("username dan password harus berbeda");
    }
    return true;

}
module.exports = {isValid};