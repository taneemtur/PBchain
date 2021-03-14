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

router.get('/find-by-city/:city', (req, res, next) => {
    Property.getPropertyByCity(req.params.city, (err, properties) => {
        if(err) {
            res.json({success : false, err : err, msg : "Failed to find property"});
        }
        else {
            res.json({success : true, properties : properties});
        }
    });
})

module.exports = router;