const sequelize = require('sequelize');
const conn = require('../config/database');

module.exports = RentedProperty = conn.define('rented-property', {
    propertyId : sequelize.STRING,
    tenant : sequelize.STRING,
    owner : sequelize.STRING,
    rentPerMonth : sequelize.INTEGER,
    securityDeposit : sequelize.INTEGER,
    rentedOn : sequelize.STRING,
    rentDueDate : sequelize.STRING

});

module.exports.addRentedProperty = async (data) => {
    try {
        let rentedProperty = await RentedProperty.create(data);
        return rentedProperty;
    }
    catch (err) {
        throw err;
    }
}

module.exports.getRentedPropertyByTenant = async (tenant) => {
    try {
        let properties = await RentedProperty.findAll({where : {tenant : tenant}})
        return properties
    }   
    catch (err) {
        throw err;
    }
}

module.exports.getRentedPropertyByOwner = async (owner) => {
    try {
        let properties = await RentedProperty.findAll({where : {owner : owner}})
        return properties
    }   
    catch (err) {
        throw err;
    }
}