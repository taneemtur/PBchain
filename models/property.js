const sequelize = require('sequelize');
const conn = require('../config/database');
const UserModel = require('./user');

module.exports = PropertyModel = conn.define('property', {
    propertyId : {
        primaryKey : true,
        allowNull : false,
        required : true,
        type : sequelize.STRING
    },
    propertyType : {
        allowNull : false,
        required : true,
        type : sequelize.ENUM,
        values : ['Flat', 'Commercial', 'Home', 'Portion', 'Room']
    },
    propertyCity : {
        allowNull : false,
        required : true,
        type : sequelize.STRING
    },
    propertyLocation : {
        allowNull : false,
        required : true,
        type : sequelize.STRING
    },
    propertyBedrooms : {
        allowNull : false,
        required : true,
        type : sequelize.INTEGER
    },
    propertyWashrooms : {
        allowNull : false,
        required : true,
        type : sequelize.INTEGER
    },
    propertyPurpose : {
        allowNull : false,
        required : true,
        type : sequelize.ENUM,
        values : ['Sale', 'Rent']
    },
    propertyCost : {
        allowNull : false,
        required : true,
        type : sequelize.INTEGER
    },
    propertyArea : {
        allowNull : false,
        required : true,
        type : sequelize.INTEGER
    },
    propertyDescription : {
        allowNull : false,
        required : true,
        type : sequelize.TEXT
    },
    propertyAddress : sequelize.STRING,
    propertyTotalRooms : sequelize.INTEGER,
});

module.exports.addProperty = (propertyData, callback) => {
    propertyData.propertyId = (propertyData.propertyCity.substring(0, 3)).toUpperCase() + "-" + Math.floor(Math.random()*90000) + 10000;
    PropertyModel.create(propertyData)
    .then(newProperty => {
        callback(undefined, newProperty);
    })
    .catch(err => {
        throw(err);
    })
}

module.exports.getPropertyById = (propertyId, callback) => {
    PropertyModel.findOne({ where : {propertyId : propertyId}})
    .then(property => {
        callback(undefined, property);
    })
    .catch(err => {
        throw(err);
    })
}

module.exports.getPropertyByType = (propertyType, callback) => {
    PropertyModel.findAll({ where : {propertyType : propertyType}})
    .then(property => {
        callback(undefined, property);
    })
    .catch(err => {
        throw(err);
    })
}

module.exports.getPropertyByCity = (propertyCity, callback) => {
    PropertyModel.findAll({ where : {propertyCity : propertyCity}})
    .then(property => {
        callback(undefined, property);
    })
    .catch(err => {
        throw(err);
    })
}

module.exports.getPropertyByLocation = (propertyLocation, callback) => {
    PropertyModel.findAll({ where : {propertyLocation : propertyLocation}})
    .then(property => {
        callback(undefined, property);
    })
    .catch(err => {
        throw(err);
    })
}

module.exports.getPropertyByPurpose = (propertyPurpose, callback) => {
    PropertyModel.findAll({ where : {propertyPurpose : propertyPurpose}})
    .then(property => {
        callback(undefined, property);
    })
    .catch(err => {
        throw(err);
    })
}

module.exports.getPropertyBySearchQuery = (searchQuery, callback) => {
    PropertyModel.findAll({ where : {
        [sequelize.Op.and] : {
            propertyPurpose : searchQuery.propertyPurpose,
            propertyCity : searchQuery.propertyCity,
            propertyLocation : {
                [sequelize.Op.substring] : searchQuery.propertyLocation
            },
            propertyType : searchQuery.propertyType,
            propertyArea : {
                [sequelize.Op.between] : [searchQuery.propertyArea.min, searchQuery.propertyArea.max]
            },
            propertyCost : {
                [sequelize.Op.between] : [searchQuery.propertyCost.min, searchQuery.propertyCost.max]
            },
            propertyBedrooms : searchQuery.propertyBedrooms
        }
    }})
    .then(property => {
        callback(undefined, property);
    })
    .catch(err => {
        throw(err);
    })
}