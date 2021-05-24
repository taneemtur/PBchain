const sequelize = require('sequelize');
const conn = require('../config/database');


module.exports = RentRequest = conn.define('rent-request', {
    propertyId : sequelize.STRING,
    userId : sequelize.STRING,
    amount : sequelize.INTEGER,
    status : {
        type : sequelize.ENUM,
        values : ['Accepted', 'Rejected', 'Pending']
    }
});

module.exports.getRentRequestsByPropertyId = getRentRequestsByPropertyId = async (propertyId) => {
    try {
        const req = await RentRequest.findAll({ where : { propertyId : propertyId}});
        return req;
    }
    catch (err) {
        throw err
    }
}

module.exports.getRentRequestsByUserId = getRentRequestsByUserId = async (userId) => {
    try {
        const req = await RentRequest.findAll({ where : { userId : userId}});
        return req;
    }
    catch (err) {
        throw err
    }
}

module.exports.addRentRequest = async (reqData) => {
    try {
        const req = await RentRequest.create(reqData);
        return req
    }   
    catch (err) {
        throw err
    }
}

module.exports.updateStatus = async (reqId, status) => {
    try {
        let req = await RentRequest.findOne({ where : { id : reqId}});
        req.status = status;
        req.save();
        return req;
    }
    catch (err) {
        throw err
    }
}