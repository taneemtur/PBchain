const router = require('express').Router();

const User = require('../models/user');

router.post('/register-user', (req, res, next) => {
    data = {
        username : req.body.username,
        email : req.body.email,
        pnum : req.body.pnum,
        name : req.body.name,
        userType : req.body.userType,
        password : req.body.password
    }

    let newUser = new User(data);

    User.addUser(newUser, (success, msg) => {
        res.json({success : success, msg : msg})
    })
})

router.get('/profile', (req, res, next) => {
    User.getUserByUsername(req.body.username, (success, user) => {
        // if(user) {
        //     res.json({success : true, user : user});
        // }
        // else {
        //     res.json({success : false, user : user});
        // }
        res.json({success : success, msg : user})
    });
})

router.delete('/delete-user/:username', (req, res, next) => {
    let username = req.params.username;
    User.deleteUser(username, (success) => {
        if(success) {
            res.json({success : success, msg : "User deleted"});
        }
        else {
            res.json({success : success, msg : "User not deleted"});
        }
    })
})

module.exports = router;