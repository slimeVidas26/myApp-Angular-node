const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/:data', (req,res) => {
    res.json({
        time: + new Date(),
        request: 'GET /private/:data',
        data: req.params.data,
        result: [1,2,3,4,5],
        user: req.userData
    })
});

router.post('/', (req,res) => {
    let data = undefined===req.body.data ? null : req.body.data;
    res.json({
        time: + new Date(),
        request: 'POST /private',
        data: data,
        result: [10,20,30,40,50],
        user: {
            id: req.userData.id,
            name: req.userData.name,
            role: req.userData.role
        }
    })
});

router.post('/admin', (req,res) => {
    if(req.userData.role==2) {
        let data = undefined===req.body.data ? null : req.body.data;
        res.json({
            time: + new Date(),
            request: 'POST /private/admin',
            data: data,
            result: [10,20,30,40,50],
            user: {
                id: req.userData.id,
                name: req.userData.name,
                role: req.userData.role
            }
        })
    }
    else {
        res.status(403);
    }
});
