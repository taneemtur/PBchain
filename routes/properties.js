const router = require('express').Router();
const Property = require('../models/property');
const UserModel = require('../models/user');
const BuyRequest = require('../models/buy-request');
const RentRequest = require('../models/rent-request');
const RentedProperty = require('../models/rented-property')
const AppUtils = require('../utils/AppUtils');
const rentedProperty = require('../models/rented-property');

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
        userUserId : req.body.userId,
        realEstateAgencyAgencyId : req.body.realEstateAgencyId,
    }

    let images = req.body.images;

    let org = 'Org1'
    // console.log(images, "ser3er")
    try {
        const newProperty = await Property.addProperty(data)
        // const ccp = AppUtils.buildCCP(org);
        const user = await UserModel.getUserById(newProperty.userUserId);
        // console.log(user)
        for (var i=0; i<images.length; i++) {
            let imageData = images[i].replace(/^data:image\/png;base64,/, "");
            AppUtils.saveAssets('img', newProperty.propertyId, i, imageData)
        }
        const contract = await AppUtils.getContract(org, 'mychannel', 'PropertyAssetContract', user.email);
        data.propertyId = newProperty.propertyId;
        console.log(data.toString())
        contract.submitTransaction('createPropertyAsset', newProperty.propertyId, JSON.stringify(data), user.email)
        .then(() => {
            res.json({success : true, msg : "Property added", property : newProperty});
        })
        .catch(err => {
            res.json({success : false, err : err, msg : "Failed to add property"});
        })
    }
    catch(err) {
        console.error(err);
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

router.post('/transfer-property/:propertyId', AppUtils.verifyToken, async (req, res, next) => {
    let propertyId = req.params.propertyId;
    let newOwner = req.body.newOwner;
    let amount = req.body.amount;

    let user = req.user;
    try {
        // let property = await Property.getPropertyById(propertyId);
        const ccp = AppUtils.buildCCPOrg1();
        const prevUser = user;
        const newUser = await UserModel.getUserById(newOwner);
        console.log(prevUser, newUser)
        let contract = await AppUtils.connectToNetwork('Org1', ccp, 'mychannel', 'PropertyAssetContract', prevUser.email)
        let transfer = await contract.submitTransaction('transferPropertyOwnership', propertyId, prevUser.email, newUser.email, amount)
        contract = await AppUtils.getContract('Org1', 'mychannel', 'WalletTokenContract', 'admin')
        transfer = await contract.submitTransaction('TransferFrom', newUser.email, prevUser.email, amount)
        let updatedProperty = await Property.updatePropertyOwner(propertyId, newOwner);
        let acceptedReq = await BuyRequest.updateStatus(propertyId, 'Accepted');
        console.log(updatedProperty, acceptedReq)
        if (transfer) {
            res.json({success : true, msg : "Property Ownership Transfered", updatedProperty})
        }
        else {
            res.json({success : false, msg : "Failed to transfer onwership"})
        }
    }
    catch (err) {
        console.error(err);
        res.json({success : false, err : "Failed to find properties."});
    }
})

router.get('/properties/:userId', async (req, res, next) => {
    let userId = req.params.userId;
    
    try {
        let properties = await Property.findAll({where : {
            userUserId : userId
        }});

        res.json({success : true, properties : properties})
    }
    catch (err) {
        res.json({success : false, msg : "Failed to get properties"})
    }
}) 

router.get('/property-history/:propertyId/:userEmail', async (req, res, next) => {
    let propertyId = req.params.propertyId;
    let userEmail = req.params.userEmail

    try {
        const ccp = AppUtils.buildCCPOrg1();
        const contract = await AppUtils.connectToNetwork('Org1', ccp, 'mychannel', 'PropertyAssetContract', userEmail);
        const history = await contract.submitTransaction('getPropertyAssetHistory', propertyId);
        res.json({success : true, history : JSON.parse(history.toString('utf8'))});
    }
    catch(err) {
        res.json({success : false, msg : "Failed to get property history"})
    }
})

router.post('/rent-property/:propertyId', async (req, res, next) => {
    const propertyId = req.params.propertyId;
    const ownerId = req.body.owner;
    const tenantId = req.body.tenant;
    const amount = req.body.amount;
    const rentReqId = req.body.id;
    const org = 'Org1'

    try {
        const property = await Property.getPropertyById(propertyId);
        const tenant = await UserModel.getUserById(tenantId);
        const owner = await UserModel.getUserById(ownerId);
        let contract = await AppUtils.getContract(org, 'mychannel', 'PropertyAssetContract', owner.email);
        await contract.submitTransaction('putPropertyonRent', property.propertyId, tenant.email, amount);
        const rentObj = await contract.evaluateTransaction('getPropertyRent', property.propertyId);
        const rentProperty = JSON.parse(rentObj.toString())
        contract = await AppUtils.getContract(org, 'mychannel', 'WalletTokenContract', 'admin');
        const transfer = await contract.submitTransaction('TransferFrom', tenant.email, owner.email, rentProperty.securityDeposit);
        if (transfer) {
            let rentendProperty = {
                propertyId : property.propertyId,
                tenant : tenant.userId,
                owner : owner.userId,
                rentPerMonth : rentProperty.rentPerMonth,
                securityDeposit : rentProperty.securityDeposit,
                rentedOn : rentProperty.rentedOn,
                rentDueDate : rentProperty.rentDueDate 
            }
            await RentedProperty.addRentedProperty(rentendProperty)
            await RentRequest.updateStatus(rentReqId, 'Accepted');
            res.json({success : true, msg : "Rent request accepted", rentObj});
        }
        else {
            res.json({success : false, msg : "Failed to rent property"})    
        }
    }
    catch (err) {
        res.json({success : false, msg : "Failed to rent property", err})
    }
})

router.get('/get-rented-properties/:tenant', async (req, res, next) => {
    let tenant = req.params.tenant;
    try {
        console.log(tenant, "tenant")
        let properties = await RentedProperty.getRentedPropertyByTenant(tenant);
        res.json({success : true, properties : properties})
    }
    catch (err) {
        res.json({success : true, msg : "Failed to get properties"})
    }
})

router.get('/on-rent/:owner', async (req, res, next) => {
    let owner = req.params.owner;
    try {
        console.log(owner, "owner")
        let properties = await RentedProperty.getRentedPropertyByOwner(owner);
        res.json({success : true, properties : properties})
    }
    catch (err) {
        res.json({success : true, msg : "Failed to get properties"})
    }
})

router.get('/pay-rent/:propertyId', AppUtils.verifyToken, async (req, res, next) => {
    let user = req.user;
    let propertyId = req.params.propertyId;
    let org = 'Org1'
    try {
        const contract = await AppUtils.getContract(org, 'mychannel', 'PropertyAssetContract', user.email);
        await contract.submitTransaction('payRent', propertyId);
        const rentBuffer = await contract.submitTransaction('getPropertyRent', propertyId);
        const rentObj = JSON.parse(rentBuffer.toString())
        let rentProperty = await RentedProperty.findOne({where : {propertyId : propertyId}});
        rentProperty.rentDueDate = rentObj.rentDueDate;

        rentProperty.save()
        res.json({success : true, msg : "Rent paid"})
    }
    catch (err) {
        res.json({success : true, msg : "Failed to pay rent.", err : err})
    }
})

module.exports = router;