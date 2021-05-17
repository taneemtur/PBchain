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

module.exports.addUser = async (userData) => {
    try {
        const user = await UserModel.findOne({ where: { email: userData.email } });
        if(user == null) {

            const salt = await bcrypt.genSalt(10);
            const hash = bcrypt.hashSync(userData.password, salt);
            userData.userId = (userData.email.substring(0, 3)).toUpperCase() + "-" + Math.floor(Math.random()*90000);
            userData.password = hash;
            const user = await UserModel.create(userData);

            return user;        
        }
        else {
            throw new Error("User already exists.")
        }
    }
    catch(err) { 
        throw err;  
    }
}

module.exports.getUserByEmail = async (email, callback) => {
    const user = await UserModel.findOne({ where: { email: email } });
    callback(user);
}

module.exports.getUserById = async (userId) => {
    try {
        let user = await UserModel.findOne({where :{ userId : userId}})
        return user
    }
    catch (err) {
        throw err
    }
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
	
