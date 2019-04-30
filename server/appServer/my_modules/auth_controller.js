const express = require('express');
const router = express.Router();
module.exports = router;
const dbfilemanager = require('./dbfilemanager')('./data/users.json');


// use jsonwebtoken package
// > npm install jsonwebtoken
// https://www.npmjs.com/package/jsonwebtoken

const jwt = require("jsonwebtoken");

router.post("/", (req,res) => {
    let uname = undefined===req.body.username ? null : req.body.username;
    let pwd = undefined===req.body.password ? null : req.body.password;
    res.json(getValidUserToken(uname,pwd));
});

function getValidUserToken(u,p) {
    let response = {
        token: null
    };
    if(u=='admin' && p=='123') {
        response.user = {
            id:111,
            name:'Administrator',
            role:2
        }
    }
    else if(u=='user' && p=='123') {
        response.user = {
            id:222,
            name:'Simple User',
            role:1
        }
    }
    if(response.user) {
        response.token = jwt.sign(
            response.user,
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );
    }
    return response;
}