const router = require('express').Router();
const Developer = require('../models/developer');
const Agency = require('../models/real-estate-agency');
const OrgReqs = require('../models/org-signup-req');

router.post('/real-estate-agency', async (req, res, next) => {
    let data = {
        orgType : 'RealEstateOrg',
        orgName : req.body.orgName,
        orgCity : req.body.orgCity,
        orgEmail : req.body.orgEmail,
        orgNum : req.body.orgNum,
        orgAddress : req.body.orgAddress,
        status : 'Pending',
    }

    try {
        let req = await OrgReqs.addOrgReq(data);
        console.log(req)
        if (req) {
            res.json({success : true, msg : "Sign Up request sent."});
        }
    }
    catch (err) {
        console.error(err);
        res.json({success : false, err, msg : "Failed to register organization"})
    }
})

router.post('/developer', async (req, res, next) => {
    let data = {
        orgType : 'DeveloperOrg',
        orgName : req.body.orgName,
        orgCity : req.body.orgCity,
        orgEmail : req.body.orgEmail,
        orgNum : req.body.orgNum,
        orgAddress : req.body.orgAddress,
        status : 'Pending',
    }

    try {
        let req = await OrgReqs.addOrgReq(data);
        console.log(req)
        if (req) {
            res.json({success : true, msg : "Sign Up request sent."});
        }
    }
    catch (err) {
        console.error(err);
        res.json({success : false, err, msg : "Failed to register organization"})
    }
})

router.get('/get-all-reqs', async (req, res, next) => {
    try {
        let reqs = await OrgReqs.getAllReqs();
        res.json({success : true , reqs : reqs});
    }
    catch (err) {
        res.json({success : false, msg : "Failed to get requests"})
    }
})

router.post('/accept-req', async (req, res, next) => {
    let orgEmail = req.body.orgEmail;

    try {
        let Req = await OrgReqs.getReqbyEmail(orgEmail);

        console.log(Req)
        if (Req.orgType == 'RealEstateOrg') {
            let orgData = {
                agencyId : null,
                agencyName : Req.orgName,
                agencyEmail : Req.orgEmail,
                agencyPnum : Req.orgNum,
                agencyCity : Req.orgCity,
                agencyAddress : Req.orgAddress,
            }

            let agency = await Agency.addAgency(orgData);
            console.log(agency);
            if(agency) {
                OrgReqs.updateStatus(orgData.agencyEmail, 'Accepted');
                res.json({success : true, msg : "Agency Registered" })
            }
            else {
                res.json({success : false, msg : "Failed to register agency"})
            }
        }
        else if (Req.orgType == 'DeveloperOrg') {
            let orgData = {
                developerId : null,
                developerName : Req.orgName,
                developerEmail : Req.orgEmail,
                developerPnum : Req.orgNum,
                developerCity : Req.orgCity,
                developerAddress : Req.orgAddress,
            }

            let dev = await Developer.addDeveloper(orgData);
            console.log(dev);
            if(dev) {
                OrgReqs.updateStatus(orgData.developerEmail, 'Accepted');
                res.json({success : true, msg : "Developer Registered" })
            }
            else {
                res.json({success : false, msg : "Failed to register developer"})
            }
        }
    }
    catch (err) {
        res.json({success : false, msg : "Failed to register organization"})
    }
})

module.exports = router;