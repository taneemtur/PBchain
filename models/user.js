const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    pnum : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const User = module.exports = mongoose.model('user', userSchema);

module.exports.addUser = async function (newUser, callback) {
    let temp = []; 
    await User.find({username : newUser.username}, (err ,users) => {
        if(err) {
            throw(err);
        }
        // console.log(users)
        if(users.length != 0) {
            temp.push(true);    
        }
        else {
            temp.push(false);
        }
    });

    await User.find({email : newUser.email}, (err ,users) => {
        if(err) {
            throw(err);
        }
        
        if(users.length != 0) {
            temp.push(true);    
        }
        else {
            temp.push(false);
        }
    });

    await User.find({pnum : newUser.pnum}, (err ,users) => {
        if(err) {
            throw(err);
        }
        
        if(users.length != 0) {
            temp.push(true);    
        }
        else {
            temp.push(false);
        }
    });

    let msg = "";

    if (temp[0]) {
        msg += "Username already exists. "
    }

    if (temp[1]) {
        msg += "Email already exists. "
    }

    if (temp[2]) {
        msg += "Phone num already exists. "
    }

    if (!temp[0] && !temp[1] && !temp[2]) {
        msg = "User Added"
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                throw(err);
            }

            bcrypt.hash (newUser.password, salt, (err,hash) => {
                if(err) {
                    throw(err);
                }
                else{
                    newUser.password = hash;         
                    newUser.save(callback(true, msg));
                }
            });
        });
    }
    else {
        callback(false, msg);
    }

    console.log(msg, temp)
}

module.exports.getUserByUsername = async function (username, callback) {
    await User.findOne({username : username}, (err, user) => {
        if(err) {
            throw(err);
        }
        else {
            if(user) {
                let temp = {
                    username : user.username,
                    email : user.email,
                    pnum : user.pnum,
                    name : user.name,
                    userType : user.userType,
                    password : user.password
                }
                callback(true ,temp);
            }
            else {
                callback(false, user)
            }
        }
    })
}

module.exports.deleteUser = async function (username, callback) {
    await User.deleteOne({username : username}, (err) => {
        let success = false;
        if(err) {
            throw(err);
        }
        else {
            success = true;
        }
        callback(success);
    })
} 

// function (newUser,callback) {
//     checkUser = newUser;
//     User.getUserByUsername(checkUser.username, (err,user) => {
//         if(err) {
//             throw(err);
//         }

//         if (!user) {
//             bcrypt.genSalt(10, (err, salt) => {
//                 bcrypt.hash (newUser.password, salt, (err,hash) => {
//                     if(err) {
//                         throw(err);
//                     }
//                     else{
//                         newUser.password = hash;
                        
//                         newUser.save(callback);
//                     }
//                 });
//             });
//         }
//         else {
//            callback("Username Already exists");
//         }
//     });
//     //newUser.save(callback);
// };