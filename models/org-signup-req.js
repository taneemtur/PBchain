const sequelize = require('sequelize');
const conn = require('../config/database');

module.exports = OrgReqs = conn.define('org-signup-reqs', {
    orgType : {
        type : sequelize.ENUM,
        values : ['RealEstateOrg', 'DeveloperOrg']
    },
    orgName : sequelize.STRING,
    orgCity : sequelize.STRING,
    orgNum : sequelize.STRING,
    orgEmail : sequelize.STRING,
    orgAddress : sequelize.STRING,
    status : {
        type : sequelize.ENUM,
        values : ['Accepted', 'Rejected', 'Pending']
    }
})

module.exports.getReqbyEmail = getReqbyEmail = async (email) => {
    try {
       let req = await OrgReqs.findOne({ where : {orgEmail : email}});
       return req;
    }   
    catch (err) {
        throw err
    }
}

module.exports.getAllReqs = async () => {
    try {
        let reqs = await OrgReqs.findAll();
        return reqs;
    }
    catch (err) {
        throw err
    }
}

module.exports.addOrgReq = async (orgData) => {
    try {
        let req = await getReqbyEmail(orgData.orgEmail);
        if (req) {
            throw new Error("Request already exists");
        }
        else {
            req = await OrgReqs.create(orgData);
            return req;
        }
    }
    catch (err) {
        throw err
    }
}


module.exports.updateStatus = async (email, status) => {
    try {
        let req = await getReqbyEmail(email);
        req.status = status;
        req.save();
        return req;
    }
    catch (err) {
        throw err;
    }
}