const router = require('express').Router();
const RentRequest = require('../models/rent-request')
const PropertyModel = require('../models/property')
const AppUtils = require('../utils/AppUtils');
const UserModel = require('../models/user');

router.post('/place-rent-request', async (req, res, next) => {
    let data = {
        userId : req.body.userId,
        propertyId : req.body.propertyId,
        amount : req.body.amount,
        status : 'pending'
    }

    const securityDeposit = data.amount * 3;

    let org = 'Org1';
    try {
        const Req = await RentRequest.addRentRequest(data);
        const user = await UserModel.getUserById(Req.userId);
        const contract = await AppUtils.getContract(org, 'mychannel', 'WalletTokenContract', user.email);
        const allowance = contract.submitTransaction('Approve', 'admin@org1.example.com', securityDeposit);
        if(allowance) {
            res.json({success : true, msg : "Rent request sent."});
        }
        else {
            res.json({success : false, msg : "Failed to send rent request"})
        }
    }
    catch (err) {
        console.error(err);
        res.json({success : false, msg : "Failed to send rent request", err})
    }
});

router.get('/get-rent-requests/:userId', async (req, res, next) => {
    const userId = req.params.userId;

    try {
        let userProperties = await PropertyModel.findAll({where : {
            userUserId : userId
        }});

        let rentReqs = [];

        for (var i=0; i<userProperties.length; i++) {
            let reqs = await RentRequest.getRentRequestsByPropertyId(userProperties[i].propertyId);
            rentReqs = rentReqs.concat(reqs);
        }

        console.log(rentReqs);
        res.json({success : true, msg : "Successfully got rent requests", reqs : rentReqs});
    }
    catch (err) {
        console.error(err);
        res.json({success : false, msg : "Failed to get rent requests"})
    }
});

module.exports = router;