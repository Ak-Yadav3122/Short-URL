//require User from model

const User = require("../models/user")

async function handleUserSignup(req,res){
    const {name,email,password} = req.body;

    await User.create({name,email,password});

    return  res.redirect('/');  // after signup send they into home page
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;

    const user = await User.findOne({email,password});  // findOne is used to match the details of user in a database and it gives a user

    if(!user){
        return res.render("login",{
            error:"Invalid Username Or Password"
        });
    }
    return  res.redirect('/'); 
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}