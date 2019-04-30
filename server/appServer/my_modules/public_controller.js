const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/:data', (req,res) => {
    res.json({
        time: + new Date(),
        request: 'GET /public/:data',
        data: req.params.data,
        result: [1,2,3,4,5]
    })
});

router.post('/', (req,res) => {
    let data = undefined===req.body.data ? null : req.body.data;
    res.json({
        time: + new Date(),
        request: 'POST /public',
        data: data,
        result: [10,20,30,40,50]
    })
});
