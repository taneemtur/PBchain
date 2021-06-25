const sequelize = require('sequelize');
const conn = require('../config/database');

module.exports = FeaturedProperty = conn.define('featured-property', {
    propertyId : sequelize.STRING,
    package : sequelize.STRING,
    price : sequelize.INTEGER
});

module.exports.addFeaturedProperty = async (data) => {
    try {
        let featuredProperty = await FeaturedProperty.create(data);
        return featuredProperty;
    }
    catch (err) {
        throw err;
    }
}