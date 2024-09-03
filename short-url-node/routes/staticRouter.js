// to handle the frontend pages we use StaticRouter 

const express = require('express');
const URL = require('../models/url.js');

const router = express.Router();

router.get("/", async(req,res)=>{
    const allurls = await URL.find({})
    return res.render("home",{
        urls: allurls,
    });
});

router.get("/signup", async(req,res)=>{
return res.render("signup");
})

router.get("/login", async(req,res)=>{
    return res.render("login");
    })

module.exports = router;