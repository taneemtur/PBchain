const sequelize = require('sequelize');
const conn = require('../config/database');
const bcrypt = require('bcrypt')

module.exports = AgentModel = conn.define('agent', {
    agentId : sequelize.STRING,
    agentName : sequelize.STRING,
    agentEmail : sequelize.STRING,
    agentPnum : sequelize.INTEGER,
    password : sequelize.STRING
})


module.exports.addAgent = async (agentData, callback) => {
    try {
        // console.log(agentData)
        const agent = await AgentModel.findOne({ where: { agentEmail: agentData.agentEmail } });
    if(agent == null) {

        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                throw err;
            }

            bcrypt.hash(agentData.password, salt, (err, hash) => {
                if(err) {
                    throw err;
                }

                agentData.agentId = (agentData.agentEmail.substring(0, 2)).toUpperCase() + "-" + Math.floor(Math.random()*90000);
                agentData.password = hash;

                AgentModel.create(agentData)
                .then(newAgent => {
                    callback(undefined, newAgent);
                })
                .catch(err => {
                    callback(err, undefined);
                })
            });
        });

       
    }
    else {
        console.log("Agent already exists.");
        callback("Agent already exists.", undefined);
    }
    }
    catch(err) { 
     callback(err, undefined)  
    }
}
