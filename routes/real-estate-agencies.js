const router = require('express').Router();
const Agency = require('../models/real-estate-agency');
const AgentModel = require('../models/agent');

router.post('/add-agency', (req, res, next) => {
    let agencyData = {
        agencyId : null,
        agencyName : req.body.agencyName,
        agencyEmail : req.body.agencyEmail,
        agencyPnum : req.body.agencyPnum,
        agencyAddress : req.body.agencyAdd,
        agencyCity : req.body.agencyCity
    };

    let agentData = {
        agentId : null,
        agentName : req.body.agentName,
        agentEmail : req.body.agentEmail,
        agentPnum : req.body.agentPnum,
        password : req.body.password,
        realEstateAgencyAgencyId : null
    }

    Agency.addAgency(agencyData, (newAgency) => {
        if(newAgency) {
            agentData.realEstateAgencyAgencyId = newAgency.agencyId;
            AgentModel.addAgent(agentData, (err, newAgent) => {
                if(err) {
                    console.error(err);
                    res.json({success : false, err : "Failed to Register user"});
                }
                else {
                    console.log(agentData,agencyData)
                    res.json({success : true, newAgency, newAgent})
                }
            })        
        }
        else {
            res.json({success : false, err : "Failed to add agency"});
        }
    })

    

    
});


router.get('/get-agencies', async (req, res, next) => {
    try {
        let agencies = await Agency.getAllAgencies();
        res.json({success : true, agencies : agencies})
    }
    catch (err) {
        res.json({success : false, msg : "Failed to get agencies"})
    }
})

module.exports = router;