const sequelize = require('sequelize');
const conn = require('../config/database');

module.exports = AgentModel = conn.define('real-estate-agent', {
    agentId : sequelize.STRING,
    agentName : sequelize.STRING,
    agentEmail : sequelize.STRING,
    password : sequelize.STRING
})

