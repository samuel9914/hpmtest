const validator = require('validator');

function isValid(req,res) {

    const email = req.body.email;
    const name = req.body.name;
    const gender = req.body.gender;

    if(typeof email != 'string' && Object.prototype.toString.call(email) != '[object String]'){
        return res.status(400).send("Tipe data email harus string");
    }
    else if(email==null || email=='' ){
        return res.status(409).send("Email tidak boleh kosong")
    }
    //validasi format email
    else if(validator.isEmail(email)== false){
        return res.status(422).send("Email yang diberikan tidak sesuai format")
    }
    //validasi panjang field email
    else if(email.length>255){
        return res.status(422).send("email harus kurang dari 255 karakter");
    }
    if(typeof name != 'string' && Object.prototype.toString.call(name) != '[object String]'){
        return res.status(400).send("tipe data nama harus string");
    }
    //validasi nama terisi atau tidak
    else if(name==null || name=='' ){
        return res.status(409).send("nama tidak boleh kosong")
    }
    //validasi panjang field nama
    else if(name.length>255){
        return res.status(422).send("nama harus kurang dari 255 karakter");
    }
    if(typeof gender != 'string' && Object.prototype.toString.call(gender) != '[object String]'){
        return res.status(400).send("tipe data gender harus string");
    }
    //validasi field gender terisi atau tidak
    else if(gender==null || gender=='' ){
        return res.status(409).send("gender tidak boleh kosong")
    }
    //limitasi input untuk field gender
    const genders= ['MALE','FEMALE'];
    if(genders.includes(gender.toUpperCase())==false){
        return  res.status(422).send("gender harus male atau female")
    }
    return true;
}
module.exports = {isValid};