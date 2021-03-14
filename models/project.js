const sequelize = require('sequelize');
const conn = require('../config/database');
const Developer = require('./developer');

module.exports = ProjectModel = conn.define('project', {
    projectId : {
        primaryKey : true,
        required : true,
        allowNull : false,
        type : sequelize.STRING
    },
    projectName : sequelize.STRING,
    projectCity : sequelize.STRING,
    projectLocation : sequelize.STRING,
    projectType : {
        type : sequelize.ENUM,
        values : ['Flats', 'ShopppingCenter', 'Society']
    },
    projectDescription : sequelize.STRING,
    projectPricing : sequelize.STRING
});

// ProjectModel.belongsTo(Developer);

module.exports.addProject = (projectData, callback) => {
    projectData.projectId = (projectData.projectName.substring(0, 3)).toUpperCase() + (projectData.projectCity.substring(0, 3)).toUpperCase() + "-" + Math.floor(Math.random()*(999-100+1)+100);
    ProjectModel.create(projectData)
    .then(newProject => {
      callback(undefined, newProject);  
    })
    .catch(err => {
        callback(err, undefined);
    })
}