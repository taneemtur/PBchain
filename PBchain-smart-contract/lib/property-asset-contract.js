'use strict';


const UserContract = require('./user-contract');
const PropertyAsset = require('./Property');
const WalletTokenContract = require('./token-contract');
const rentPrefix = 'rent';

class PropertyAssetContract extends WalletTokenContract{

    async propertyAssetExists(ctx, propertyAssetId) {
        const buffer = await ctx.stub.getState(propertyAssetId);
        return (!!buffer && buffer.length > 0);
    }

    async createPropertyAsset(ctx, propertyAssetId, data, owner) {
        // const propertyAssetData = JSON.parse(data)
        console.log(data);
        const propertyAssetData = JSON.parse(data)
        // console
        const exists = await this.propertyAssetExists(ctx, propertyAssetId);
        if (exists) {
            throw new Error(`The property asset ${propertyAssetId} already exists`);
        }
        const asset = new PropertyAsset(propertyAssetId, owner, propertyAssetData);
        
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(propertyAssetId, buffer);
    }

    async readPropertyAsset(ctx, propertyAssetId) {
        const exists = await this.propertyAssetExists(ctx, propertyAssetId);
        if (!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }
        const buffer = await ctx.stub.getState(propertyAssetId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updatePropertyAsset(ctx, propertyAssetId, data, owner) {
        const propertyAssetData = JSON.parse(data)
        const exists = await this.propertyAssetExists(ctx, propertyAssetId);
        if (!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }
        const asset = new PropertyAsset(propertyAssetId, owner, propertyAssetData)
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(propertyAssetId, buffer);
    }

    async transferPropertyOwnership(ctx, propertyAssetId, owner, newOwner, amount) {
        const propertyBytes = await ctx.stub.getState(propertyAssetId); 
        if (!propertyBytes || propertyBytes.length === 0) {
            throw new Error(`${propertyAssetId} does not exist`);
        }
        const property = JSON.parse(propertyBytes.toString());

        if (property.owner == owner) {
            property.owner = newOwner;
        } 
        else {
            throw new Error(`${propertyAssetId} does not belong to ${owner}`);
        }
        

        await ctx.stub.putState(propertyAssetId, Buffer.from(JSON.stringify(property)));

        const transferEvent = { owner, newOwner, propertyId: property.PropertyAssetId, amount };
        ctx.stub.setEvent('Transfer', Buffer.from(JSON.stringify(transferEvent)));

        return true;
    }

    async putPropertyonRent (ctx, propertyAssetId, tenant, rentPerMonth) {
        const exists = await this.propertyAssetExists(ctx, propertyAssetId);

        if(!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }

        // const propertyAssetBytes = await ctx.stub.getState(propertyAssetId);
        // // console.log(propertyAssetBytes);
        // const propertyAsset = JSON.parse(propertyAssetBytes.toString())

        // if (!(propertyAsset.propertyDetails.purpose == "Rent")) {
        //     throw new Error(`The property asset ${propertyAssetId} not for rent`);
        // }


        let rentDate = new Date(Date.now())
        let rentDueDate = new Date(rentDate)
        rentDueDate.setMonth(rentDueDate.getMonth() + 1)

        const rent = {
            tenant : tenant,
            rentPerMonth : rentPerMonth,
            securityDeposit : rentPerMonth*3,
            rentedOn : rentDate.toDateString(),
            rentDueDate : rentDueDate.toDateString()
        }

        const rentKey = ctx.stub.createCompositeKey(rentPrefix, [propertyAssetId]);

        const rentObj = Buffer.from(JSON.stringify(rent));
        await ctx.stub.putState(rentKey, rentObj);
    }

    async getPropertyRent (ctx, propertyAssetId) {
        const exists = await this.propertyAssetExists(ctx, propertyAssetId);

        if (!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }

        const rentKey = ctx.stub.createCompositeKey(rentPrefix, [propertyAssetId]);
        const buffer = await ctx.stub.getState(rentKey);

        if (!(!!buffer && buffer.length > 0)) {
            throw new Error(`The property asset ${propertyAssetId} not on rent`);
        }

        const rent = JSON.parse(buffer.toString());
        return rent;
    }

    async updateRent (ctx, propertyAssetId, newRent) {
        const exists = await this.propertyAssetExists(ctx, propertyAssetId);

        if (!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }

        const rentKey = ctx.stub.createCompositeKey(rentPrefix, [propertyAssetId]);
        const buffer = await ctx.stub.getState(rentKey);

        if (!(!!buffer && buffer.length > 0)) {
            throw new Error(`The property asset ${propertyAssetId} not on rent`);
        }

        newRent = JSON.parse(newRent);
        console.log(newRent);

        const rentObj = Buffer.from(JSON.stringify(newRent));
        await ctx.stub.putState(rentKey, rentObj);
    }

    async deletePropertyAsset(ctx, propertyAssetId) {
        const exists = await this.propertyAssetExists(ctx, propertyAssetId);
        if (!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }
        await ctx.stub.deleteState(propertyAssetId);
    }

    async getPropertyAssetHistory (ctx, propertyAssetId) {
        const historyIterator = await ctx.stub.getHistoryForKey(propertyAssetId);
        let allResults = [];
        while (true) {
            let res = await historyIterator.next()
            if (res.value && res.value.value.toString()) {
            let jsonRes = {};
            // console.log(JSON.stringify(res), res, JSON.stringify(res.value), res.value);
            jsonRes.tx_id = res.value.txId;
            try {
                jsonRes.propertyAssetValue = JSON.parse(res.value.value.toString('utf8'));
            } catch (err) {
                console.log(err);
                jsonRes.propertyAssetValue = res.value.value.toString('utf8');
            }
            allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await historyIterator.close();
                console.log(allResults);
                return allResults;
            }
        }
    }

}


module.exports = PropertyAssetContract;

