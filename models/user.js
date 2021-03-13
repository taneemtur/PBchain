// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const conn = require('../config/database');
const sequelize = require('sequelize');
const PropertyModel = require('./property');

module.exports = UserModel = conn.define('user', {
    userId : {
        primaryKey : true,
        allowNull : false,
        required : true,
        type : sequelize.STRING
    },
    name : sequelize.STRING,
    email : {
        allowNull : false,
        required : true,
        type : sequelize.STRING
    },
    Pnum : {
        allowNull : false,
        required : true,
        type : sequelize.INTEGER
    },
    password : {
        allowNull : false,
        required : true,
        type : sequelize.STRING
    }
});

UserModel.hasMany(PropertyModel);
PropertyModel.belongsTo(UserModel);

module.exports.addUser = async (userData, callback) => {
    const user = await UserModel.findOne({ where: { email: userData.email } });
    if(user == null) {

        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                throw err;
            }

            bcrypt.hash(userData.password, salt, (err, hash) => {
                if(err) {
                    throw err;
                }

                userData.userId = (userData.email.substring(0, 3)).toUpperCase() + "-" + Math.floor(Math.random()*90000);
                userData.password = hash;

                UserModel.create(userData)
                .then(newUser => {
                    callback(undefined, newUser);
                })
                .catch(err => {
                    callback(err, undefined);
                })
            });
        });

       
    }
    else {
        console.log("User already exists.");
        callback("User already exists.", undefined);
    }
}

module.exports.getUserByEmail = async (email, callback) => {
    const user = await UserModel.findOne({ where: { email: email } });
    callback(user);
}

module.exports.deleteUser = async (email, callback) => {
    const user = await UserModel.findOne({ where: { email: email } });

    if(user) {
        await user.destroy();
        callback(true);
    }
    else {
        callback(false);
    }
}

module.exports.comparePassword = (canidatePassword, hash, callback) => {
    bcrypt.compare(canidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw(err);
        }

        callback(isMatch);
    });
}
	
