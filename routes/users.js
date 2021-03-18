const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secret = 'PBCHAINUSER';

router.post('/register-user', (req, res, next) => {
    data = {
        userId : null,
        email : req.body.email,
        Pnum : req.body.pnum,
        name : req.body.name,
        password : req.body.password
    }

    User.addUser(data, (err, newUser) => {
        if(err) {
            res.json({success : false, err : err});
        }

        if(newUser) {
            res.json({
                success : true,
                msg : "User Successfully registered.",
                user : {
                    userId : newUser.userId,
                    name : newUser.name,
                    email : newUser.email,
                    Pnum : newUser.Pnum
                }
            });
        }
        else {
            res.json({success : false, err : "Failed to register user."});
        }
    })
})

router.post('/authenticate-user', (req, res, next) => {
    let data = {
        email : req.body.email,
        password : req.body.password
    }

    User.getUserByEmail(data.email, (user) => {
        if(user) {
            User.comparePassword(data.password, user.password, (isMatch) => {
                if(isMatch) {
                    const token = jwt.sign({user}, secret, {
                        expiresIn : 604800
                    });
                    console.log(user);
                    res.json({
                        success : true,
                        user : {
                            userId : user.userId,
                            name : user.name,
                            email : user.email,
                            pnum : user.Pnum,
                            createdAt : user.createdAt,
                        },
                        token : token
                    })
                }
                else {
                    res.json({success : false, err : "Incorrect password."});
                }
            })
        }
        else {
            res.json({success : false, err : "User does not exists."});
        }
    })
})

router.get('/profile', (req, res, next) => {
    User.getUserByEmail( req.body.email, (user) => {
        if(user) {
            res.json({
                success : true,
                msg : "User profile found.",
                user : {
                    name : user.name,
                    email : user.email,
                    pnum : user.pnum
                }
            });
        }
        else {
            res.json({success : false, err : "User does not exists."});
        }
    });
})

router.delete('/delete-user/:email', (req, res, next) => {
    let email = req.params.email;
    User.deleteUser(email, (success) => {
        if(success) {
            res.json({success : success, msg : "User deleted"});
        }
        else {
            res.json({success : success, err : "User does not exists."});
        }
    })
})

module.exports = router;