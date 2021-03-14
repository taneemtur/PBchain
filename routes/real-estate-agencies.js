const router = require('express').Router();
const Agency = require('../models/real-estate-agency');


router.post('/add-agency', (req, res, next) => {
    let agencyData = {
        agencyId : null,
        agencyName : req.body.agencyName,
        agencyEmail : req.body.agencyEmail,
        agencyPnum : req.body.agencyPnum,
        agencyAddress : req.body.agencyAddress,
        agencyCity : req.body.agencyCity
    };

    Agency.addAgency(agencyData, (newAgency) => {
        if(newAgency) {
            res.json({success : true, agencyData : newAgency, msg : "Agency Added."});
        }
        else {
            res.json({success : false, err : "Failed to add agency"});
        }
    })
});

module.exports = router;