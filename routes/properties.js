const router = require('express').Router();
const Property = require('../models/property');

router.post('/add-property', (req, res, next) => {
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

    Property.addProperty(data, (err, newProperty) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to add property"});
        }
        else {
            res.json({success : true, msg : "Property added", property : newProperty});
        }
    })
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

module.exports = router;