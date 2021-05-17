const router = require('express').Router();
const UserModel = require('../models/user');
const AppUtils = require('../utils/AppUtils');

router.post('/deposit', async (req, res, next) => {
    const userEmail = req.body.email;
    const amount = req.body.amount;

    try {
        const ccp = AppUtils.buildCCPOrg1();
        let walletTokenContract = await AppUtils.connectToNetwork('Org1', ccp, 'mychannel', 'WalletTokenContract', 'admin');
        const mint = await walletTokenContract.submitTransaction('Mint', amount);
        if (mint) {
            const transfer = await walletTokenContract.submitTransaction('Transfer', userEmail, amount);
            if (transfer) {
                walletTokenContract = await AppUtils.connectToNetwork('Org1', ccp, 'mychannel', 'WalletTokenContract', userEmail);
                const balance = await walletTokenContract.evaluateTransaction('ClientAccountBalance');        
                res.json({success : true, msg : "Successfully Deposited", balance : balance.toString()});
            }
            else {
                throw new Error("Failed to deposit.")    
            }
        }
        else {
            throw new Error("Failed to mint.")
        }
    }
    catch (err) {
        console.error(err);
        res.json({success : false, msg : "Failed to deposit."})
    }
});

router.post('/transfer', async (req, res, next) => {
    const userEmail = req.body.email;
    const toEmail = req.body.toEmail
    const amount = req.body.amount;

    console.log(toEmail, amount)
    UserModel.getUserByEmail(toEmail, (user) => {

        if(!user) {
            res.json({success : false, msg : `Failed to transfer. ${toEmail} does not exist.`})
        }
        
    })

    try {
        const ccp = AppUtils.buildCCPOrg1();
        let walletTokenContract = await AppUtils.connectToNetwork('Org1', ccp, 'mychannel', 'WalletTokenContract', userEmail);
        const transfer = await walletTokenContract.submitTransaction('Transfer', toEmail, amount);
        if (transfer) {
            const balance = await walletTokenContract.evaluateTransaction('ClientAccountBalance');        
            res.json({success : true, msg : "Successfully Transfered.", balance : balance.toString()});
        }
        else {
            throw new Error("Failed to Transfer.")
        }
    }
    catch (err) {
        console.error(err);
        res.json({success : false, msg : "Failed to Transfer."})
    }
});

router.get('/account-balance/:email', async (req, res, next) => {
    const userEmail = req.params.email;
    console.log(userEmail)
    try {
        const ccp = AppUtils.buildCCPOrg1();
        const walletTokenContract = await AppUtils.connectToNetwork('Org1', ccp, 'mychannel', 'WalletTokenContract', userEmail);
        const balance = await walletTokenContract.evaluateTransaction('ClientAccountBalance');
        console.log(balance.toString())
        res.json({success : true, balance : balance.toString()});
    }
    catch (err) {
        console.error(err);
        res.json({success : false, msg : "Failed to get account balance."})
    }
});

router.post('/withdraw', async (req, res, next) => {
    const userEmail = req.body.email;
    const amount = req.body.amount;
    console.log
    try {
        const ccp = AppUtils.buildCCPOrg1();
        let walletTokenContract = await AppUtils.connectToNetwork('Org1', ccp, 'mychannel', 'WalletTokenContract', userEmail);
        await walletTokenContract.submitTransaction('Transfer', 'admin@org1.example.com', amount);
        const balance = await walletTokenContract.evaluateTransaction('ClientAccountBalance');
        walletTokenContract = await AppUtils.connectToNetwork('Org1', ccp, 'mychannel', 'WalletTokenContract', 'admin');
        await walletTokenContract.submitTransaction('Burn', amount); 

        res.json({success : true, balance : balance.toString(), msg : "Withdraw Successful"});
    }
    catch (err) {
        res.json({success : false, msg : "Failed to withdraw."})
    }
})

module.exports = router;