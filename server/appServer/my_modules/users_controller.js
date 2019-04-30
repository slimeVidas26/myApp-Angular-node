const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbfilemanager = require('./dbfilemanager')('./data/users.json');

module.exports = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

// rest verbs for api
app.get("/",getallusers);
app.get("/:id",getuserbyid);
app.post("/",createuser);
app.put("/:id",edituser);
app.delete("/:id",deleteuser);

async function getallusers(req,res) {
    try {
        let result = [];
        let users = await dbfilemanager.get();
        for(u of users) {
            result.push({
                id: u.id,
                username: u.username,
                password : u.password
            });
        }
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send('bad request');
    }
}

async function getuserbyid(req,res) {
    try {
        let users = await dbfilemanager.get();
        let id = req.params.id;
        let result = null;
        for(let u of users) {
            if(u.id==id) {
                result = u
            }
        }
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send('bad request');
    }
}
async function createuser(req,res) {
    try {
        let users = await dbfilemanager.get();
        let newid = + new Date();
        users.push({
            id:newid,
            username: req.body.username,
            password: req.body.password
        })
        await dbfilemanager.set(users);
        res.json({
            id:newid
        })
    }
    catch(e) {
        console.log(e);
        res.status(500).send('bad request');
    }
}
async function edituser(req,res) {
    try {
        let users = await dbfilemanager.get();
        let id = req.params.id,
            username = req.body.username,
            password = req.body.password;
        let result = null;
        for(let i=0;i<users.length;i++) {
            if(users[i].id==id) {
                users[i].username = username;
                users[i].password = password;
               
                result = true;
            }
        }
        if(result) {
            await dbfilemanager.set(users);
        }
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send('bad request');
    }
}
async function deleteuser(req,res) {
    try {
        let users = await dbfilemanager.get();
        let id = req.params.id;
        console.log(`delete ${id}`);
        let deleteIndex = null;
        for(let i=0;i<users.length;i++) {
            if(users[i].id==id) {
                deleteIndex = i;
            }
        }
        if(deleteIndex!=null) {
            users.splice(deleteIndex,1);
            await dbfilemanager.set(users);
        }   
        res.status(200).end();
    }
    catch(e) {
        console.log(e);
        res.status(500).send('bad request');
    }
}



