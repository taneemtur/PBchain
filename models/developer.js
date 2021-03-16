const sequelize = require('sequelize');
const conn = require('../config/database');
const bcrypt = require('bcrypt');
const Project = require('./project');
const AgentModel = require('./agent');

module.exports = DeveloperModel = conn.define('developer', {
    developerId : {
        primaryKey : true,
        allowNull : false,
        required : true,
        type : sequelize.STRING
    },
    developerName : sequelize.STRING,
    developerEmail : sequelize.STRING,
    developerCity : sequelize.STRING,
    developerAddress : sequelize.STRING,
    developerPnum : sequelize.STRING
});

DeveloperModel.hasMany(Project);
DeveloperModel.hasOne(AgentModel);

module.exports.addDeveloper = (developerData, callback) => {
    developerData.developerId = (developerData.developerName.substring(0, 3)).toUpperCase() + (developerData.developerCity.substring(0, 3)).toUpperCase() + "-" + Math.floor(Math.random()*(999-100+1)+100);
    DeveloperModel.create(developerData)
    .then(newDeveloper => {
        callback(undefined, newDeveloper);
    })
    .catch(err => {
        callback(err, undefined);
    })
}