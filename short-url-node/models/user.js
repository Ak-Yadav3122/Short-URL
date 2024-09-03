// Creation of user model
 
const mongoose = require("mongoose")
const {handleUserSignup} = require('../controllers/user')
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        unique: true,
    },
},{timestamps:true});


const User = mongoose.model('user',userSchema);

module.exports = User ;