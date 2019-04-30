console.clear();

const express = require('express');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.status(200).end();
    }
    else {
      next();
    }
});

// to interact with json body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// require main controllers
const authController = require('./my_modules/auth_controller');
const publicController = require('./my_modules/public_controller');
const privateController = require('./my_modules/private_controller');
const mixedController = require('./my_modules/mixed_controller');
const usersController = require('./my_modules/users_controller');
const checkAuth = require('./my_modules/jwt_middleware');

// main routes
app.use('/login',authController);
app.use('/public',publicController);
app.use('/private',checkAuth,privateController);
app.use('/mixed',mixedController);
app.use('/users',usersController);

// default route
app.use('**', (req,res) => {
    res.status(404).send("404 Not Found");
});

// start listen app
app.listen(PORT,()=>{
    console.log(`Node listening on localhost:${PORT}`);
});