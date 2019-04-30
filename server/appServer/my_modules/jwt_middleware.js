const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    try {
        let token = null;
        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token || token=='') {
            throw "Missing Token";
        }
        // jwt.verify first decodes the token, then verifies against the JSW_KEY provided
        let decoded = jwt.verify(token,process.env.JWT_KEY);
        // once decoded and verified, place the user object in req parmater
        req.userData = decoded;
        // move on to next middleware
        next();
    }
    catch(e) {
        console.log(e.message);
        res.status(403).end();
    }
};