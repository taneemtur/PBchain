const router = require('express').Router();
const Developer = require('../models/developer')

router.post('/add-developer', (req, res, next) => {
    let data = {
        developerId : null,
        developerName : req.body.developerName,
        developerEmail : req.body.developerEmail,
        developerCity : req.body.developerCity,
        developerPnum : req.body.developerPnum,
        developerAddress : req.body.developerAddress,
        password : req.body.password
    };

    Developer.addDeveloper(data, (err, newDeveloper) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to add developer."});
        }
        else {
            res.json({success : true, msg : "Developer added.", newDeveloper : {
                developerId : newDeveloper.developerId,
                developerName : newDeveloper.developerName,
                developerEmail : newDeveloper.developerEmail,
                developerCity : newDeveloper.developerCity,
                developerPnum : newDeveloper.developerPnum,
                developerAddress : newDeveloper.developerAddress
            }})
        }
    })
})

module.exports = router;