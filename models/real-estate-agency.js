const sequelize = require('sequelize');
const conn = require('../config/database');

const Agent = require('./agent');
const PropertyModel = require('./property')

const AgencyModel = conn.define('real-estate-agency', {
    agencyId : {
        type : sequelize.STRING,
        primaryKey : true,
        allowNull : false
    },
    agencyName : sequelize.STRING,
    agencyEmail : sequelize.STRING,
    agencyPnum : sequelize.INTEGER,
    agencyAddress : sequelize.STRING,
    agencyCity : sequelize.STRING
});

AgencyModel.hasOne(Agent);

AgencyModel.hasMany(PropertyModel);

module.exports.addAgency = async (agencyData, callback) => {
    agencyData.agencyId = (agencyData.agencyName.substring(0, 3)).toUpperCase() + (agencyData.agencyCity.substring(0, 3)).toUpperCase() + "-" + Math.floor(Math.random()*(999-100+1)+100);
    const newAgency = await AgencyModel.create(agencyData);
    callback(newAgency);
}
