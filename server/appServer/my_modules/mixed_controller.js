const express = require('express');
const router = express.Router();
module.exports = router;

const checkAuth = require('./jwt_middleware');

router.get('/public/:data', (req, res) => {
    res.json({
        time: +new Date(),
        request: 'GET /mixed/public/:data',
        data: req.params.data,
        result: [1, 2, 3, 4, 5]
    });
});

// calling middleware to do the work before the next function
// if not valid it will res.status(403) in the middleware
router.get('/private/:data', checkAuth, (req, res) => {
    // if got here, I have the res.userData
    res.json({
        time: +new Date(),
        request: 'POST /mixed/private/:data',
        data: req.params.data,
        result: [10, 20, 30, 40, 50],
        user: req.userData
    })
});
