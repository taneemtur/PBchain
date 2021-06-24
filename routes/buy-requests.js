const router = require('express').Router();
const BuyRequest = require('../models/buy-request')
const PropertyModel = require('../models/property')
const AppUtils = require('../utils/AppUtils');
const UserModel = require('../models/user');

router.post('/place-buy-request', AppUtils.verifyToken, async (req, res, next) => {
    let buyReq = {
        amount : req.body.amount,
        userUserId : req.body.userId,
        propertyPropertyId : req.body.propertyId,
        status : 'Pending'
    }
    let org = 'Org1';
    let user = req.user;
    console.log(buyReq)
    try {
        // let user = await UserModel.getUserById(buyReq.userUserId)
        const contract = await AppUtils.getContract(org, 'mychannel', 'WalletTokenContract', user.email);
        let allowance = await contract.submitTransaction('Approve', 'admin@org1.example.com', buyReq.amount);
        if (allowance) {
            let request = await BuyRequest.addRequest(buyReq);
            console.log(request)
            if (request) {
                res.json({success : true, msg : "Buy Request made to owner."});
            }
            else {
                res.json({success : false, msg : "Failed to make buy request to owner."});
            }
        }
        else {
            res.json({success : false, msg : "Failed to make buy request to owner."});
        }
    }
    catch (err) {
        console.error(err);
        res.json({success : false, msg : "Failed to make buy request to owner.", err : err});
    }
})

router.get('/get-buy-requests', AppUtils.verifyToken, async (req, res, next) => {
    let user = req.user;
    let userId = user.userId;
    console.log(user)
    try {
        let userProperties = await PropertyModel.findAll({where : {
            userUserId : userId
        }});

        let buyReqs = [];
        for (var i=0; i<userProperties.length; i++) {
            let req = await BuyRequest.getBuyRequestsByPropertyId(userProperties[i].propertyId);
            console.log(req)
            buyReqs = buyReqs.concat(req);
        }

        console.log(buyReqs)
        res.json({success : true, msg : "", reqs : buyReqs});
    }
    catch (err) {
        console.error(err);
        res.json({success : false, msg : "error"});
    }
})

module.exports = router;