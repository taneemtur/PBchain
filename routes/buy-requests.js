const router = require('express').Router();
const BuyRequest = require('../models/buy-request')
const PropertyModel = require('../models/property')

router.post('/place-buy-request', async (req, res, next) => {
    let buyReq = {
        amount : req.body.amount,
        userUserId : req.body.userId,
        propertyPropertyId : req.body.propertyId,
        status : 'Pending'
    }
    console.log(buyReq)
    try {
        let request = await BuyRequest.addRequest(buyReq);
        console.log(request)
        if (request) {
            res.json({success : true, msg : "Buy Request made to owner."});
        }
        else {
            res.json({success : true, msg : "Failed to make buy request to owner."});
        }
    }
    catch (err) {
        console.error(err);
        res.json({success : true, msg : "Failed to make buy request to owner.", err : err});
    }
})

router.get('/get-buy-requests/:userId', async (req, res, next) => {
    let userId = req.params.userId;
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