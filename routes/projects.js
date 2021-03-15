const router = require('express').Router();
const Project = require('../models/project');

router.post('/add-project', (req, res, next) => {
    let data = {
        projectId : null,
        projectName : req.body.projectName,
        projectCity : req.body.projectCity,
        projectLocation : req.body.projectLocation,
        projectType : req.body.projectType,
        projectDescription : req.body.projectDescription,
        projectPricing : req.body.projectPricing,
        developerDeveloperId : req.body.developerId
    };

    
})

module.exports = router;