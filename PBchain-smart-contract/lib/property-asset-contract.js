'use strict';


const UserContract = require('./user-contract');
const PropertyAsset = require('./Property');

// const userPrefix = 'User';

class PropertyAssetContract extends UserContract {

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

