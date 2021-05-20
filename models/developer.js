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

module.exports.addDeveloper = async (developerData) => {
    try {
        developerData.developerId = (developerData.developerName.substring(0, 3)).toUpperCase() + (developerData.developerCity.substring(0, 3)).toUpperCase() + "-" + Math.floor(Math.random()*(999-100+1)+100);
        return await DeveloperModel.create(developerData);
    }
    catch (err) {
        throw err;
    }
}

module.exports.getDevelopers = async () => {
    try {
        let developers = await DeveloperModel.findAll();
        return developers;
    }
    catch (err) {
        throw err
    }
}