const sequelize = require('sequelize');
const conn = require('../config/database');

const Agent = require('./agent');
const PropertyModel = require('./property')
const UserModel = require('./user');

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

AgencyModel.hasMany(UserModel);

module.exports.addAgency = async (agencyData) => {
    try {
        agencyData.agencyId = (agencyData.agencyName.substring(0, 3)).toUpperCase() + (agencyData.agencyCity.substring(0, 3)).toUpperCase() + "-" + Math.floor(Math.random()*(999-100+1)+100);
        let agency = await this.getAgencyByEmail(agencyData.agencyEmail);
        // console.log(agency)
        if (agency) {
            throw new Error("Agency already exists");
        }
        else {
            const newAgency = await AgencyModel.create(agencyData);
            return newAgency
        }
    }
    catch (err) {
        throw err
    }
}

module.exports.getAgencyByEmail = async (email) => {
    try {
        const agency = await AgencyModel.findOne({ where : { agencyEmail : email}});
        return agency;
    }
    catch (err) {
        throw err
    }
}

module.exports.getAgencyById = async (id) => {
    try {
        const agency = AgencyModel.findOne({ where : { agencyId : id}});
        return agency;
    }
    catch (err) {
        throw err
    }
}

module.exports.getAllAgencies = async () => {
    try {
        const agencies = await AgencyModel.findAll();
        return agencies;
    }
    catch (err) {
        throw err;
    }
}