const router = require('express').Router();
const Developer = require('../models/developer')
const Agent = require('../models/agent');

router.post('/add-developer', (req, res, next) => {
    let data = {
        developerId : null,
        developerName : req.body.developerName,
        developerEmail : req.body.developerEmail,
        developerCity : req.body.developerCity,
        developerPnum : req.body.developerPnum,
        developerAddress : req.body.developerAdd
    };

    let agentData = {
        agentId : null,
        agentName : req.body.agentName,
        agentEmail : req.body.agentEmail,
        agentPnum : req.body.agentPnum,
        password : req.body.password,
        developerDeveloperId : null
    }

    Developer.addDeveloper(data, (err, newDeveloper) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to add developer."});
        }
        else {
            agentData.developerDeveloperId = newDeveloper.developerId;
            Agent.addAgent(agentData, (err, newAgent)=>{
                if(err) {
                    console.error(err);
                    res.json({success : false, err : "Failed to Register user"});
                }
                else {
                    console.log(agentData, data);
                    res.json({success : true, data, newAgent})
                }  
            })
        }
    })
})

module.exports = router;