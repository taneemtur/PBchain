const router = require('express').Router();
const Property = require('../models/property');
const AppUtils = require('../utils/AppUtils');

router.post('/add-property', async (req, res, next) => {
    let data = {
        propertyId : null,
        propertyType : req.body.propertyType,
        propertyCity : req.body.propertyCity,
        propertyLocation : req.body.propertyLocation,
        propertyBedrooms : req.body.propertyBedrooms,
        propertyWashrooms : req.body.propertyWashrooms,
        propertyPurpose : req.body.propertyPurpose,
        propertyCost : req.body.propertyCost,
        propertyArea : req.body.propertyArea,
        propertyDescription : req.body.propertyDescription,
        propertyAddress : req.body.propertyAddress,
        propertyTotalRooms : req.body.propertyTotalRooms,
        userUserId : req.body.userUserId,
        realEstateAgencyAgencyId : req.body.realEstateAgencyAgencyId,
    }

    

    try {
        const newProperty = await Property.addProperty(data)
        const ccp = AppUtils.buildCCPOrg1();
        const contract = await AppUtils.connectToNetwork('Org1', ccp, 'mychannel', 'PropertyAssetContract', 'admin')
        data.propertyId = newProperty.propertyId;
        console.log(data.toString())
        contract.submitTransaction('createPropertyAsset', newProperty.propertyId, JSON.stringify(data), 'admin')
        .then(() => {
            res.json({success : true, msg : "Property added", property : newProperty});
        })
        .catch(err => {
            res.json({success : false, err : err, msg : "Failed to add property"});
        })
    }
    catch(err) {
        res.json({success : false, err : err, msg : "Failed to add property"});
    }
});

router.get('/all-properties', (req, res, next) => {
    Property.getAllProperties((err, property) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to find property"});
        }
        else {
            res.json({success : true, property : property});
        }
    });
})

router.get('/find-by-id/:id', (req, res, next) => {
    Property.getPropertyById(req.params.id, (err, property) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to find property"});
        }
        else {
            res.json({success : true, property : property});
        }
    });
})

router.get('/find-by-city/:city', (req, res, next) => {
    Property.getPropertyByCity(req.params.city, (err, properties) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to find property"});
        }
        else {
            if(properties.length == 0) {
                res.json({success : false, err : "Failed to find properties."});
            }
            else {
                res.json({success : true, properties : properties});
            }
        }
    });
})

router.get('/find-by-purpose/:purpose', (req, res, next) => {
    Property.getPropertyByPurpose(req.params.purpose, (err, properties) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to find property"});
        }
        else {
            if(properties.length == 0) {
                res.json({success : false, err : "Failed to find properties."});
            }
            else {
                res.json({success : true, properties : properties});
            }
        }
    });
})

router.get('/find-by-location/:location', (req, res, next) => {
    Property.getPropertyByLocation(req.params.location, (err, properties) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to find property"});
        }
        else {
            if(properties.length == 0) {
                res.json({success : false, err : "Failed to find properties."});
            }
            else {
                res.json({success : true, properties : properties});
            }
        }
    });
})

router.get('/find-by-type/:type', (req, res, next) => {
    Property.getPropertyByType(req.params.type, (err, properties) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to find property"});
        }
        else {
            if(properties.length == 0) {
                res.json({success : false, err : "Failed to find properties."});
            }
            else {
                res.json({success : true, properties : properties});
            }
        }
    });
})

router.get('/find-by-query', (req, res, next) => {
    let data = {
        propertyPurpose : req.body.propertyPurpose,
        propertyCity : req.body.propertyCity,
        propertyLocation : req.body.propertyLocation,
        propertyType : req.body.propertyType,
        propertyArea : req.body.propertyArea,
        propertyCost : req.body.propertyCost,
        propertyBedrooms : req.body.propertyBedrooms,
    }

    Property.getPropertyBySearchQuery(data, (err, properties) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to find property"});
        }
        else {
            if(properties.length == 0) {
                res.json({success : false, err : "Failed to find properties."});
            }
            else {
                res.json({success : true, properties : properties});
            }
        }
    });
})

router.post('/transfer-property/:propertyId', async (req, res, next) => {
    let propertyId = req.params.propertyId;
    let newOwner = req.body.newOwner;

    try {
        let property = await Property.updatePropertyOwner(propertyId, newOwner);
        console.log(property)
    }
    catch (err) {
        console.error(err);
        res.json({success : false, err : "Failed to find properties."});
    }
})

module.exports = router;