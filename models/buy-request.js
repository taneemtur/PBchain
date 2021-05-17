const sequelize = require('sequelize');
const conn = require('../config/database');
const UserModel = require('./user');
const PropertyModel = require('./property');

module.exports = BuyRequest = conn.define('buy-request', {
    amount : sequelize.INTEGER,
    status : {
        type : sequelize.ENUM,
        values : ['Accepted', 'Rejected', 'Pending']
    }
})

BuyRequest.belongsTo(UserModel, {
    foreginKey : 'userId',
});

BuyRequest.belongsTo(PropertyModel, {
    foreginKey : 'propertyId',
});

module.exports.addRequest = async (request) => {
    try {
        let req = await BuyRequest.create(request);
        return req;
    }
    catch(err) {
        throw(err)
    }
}

module.exports.getBuyRequestsByUserId = async (userId) => {
    try {
        let reqs = await BuyRequest.findAll({where : {userUserId : userId}})
        return reqs;
    }
    catch (err) {
        throw err;
    }
}

module.exports.getBuyRequestsByPropertyId = async (propertyId) => {
    try {
        let reqs = await BuyRequest.findAll({where : {propertyPropertyId : propertyId}})
        return reqs;
    }
    catch (err) {
        throw err;
    }
}

module.exports.updateStatus = async (propertyId, status) => {
 try {
     let req = await BuyRequest.findOne({ where : { propertyPropertyId : propertyId}});
     req.status = status;
     req.save();
     return req;
 }   
 catch (err) {
     throw err;
 }
}