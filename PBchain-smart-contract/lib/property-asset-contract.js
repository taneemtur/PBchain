
'use strict';

const { Contract } = require('fabric-contract-api');
const User = require('./User');
const PropertyAsset = require('./Property');

// const userPrefix = 'User';

class UserContract extends Contract {

    async userExists (ctx, email) {
        const buffer = await ctx.stub.getState(email);
        return (!!buffer && buffer.length > 0);
    }

    async createUserAccount (ctx, data) {
        const userData = JSON.parse(data)
        const clientId = ctx.clientIdentity.getID();
        const exists = await this.userExists(ctx, userData.email);
        if (exists) {
            throw new Error(`The user with email ${userData.email} already exists`);
        }

        const user = new User(clientId, userData.name, userData.email, userData.pnum, userData.userType, userData.password);
        const buffer = Buffer.from(JSON.stringify(user));
        await ctx.stub.putState(userData.email, buffer);
    }

    async getUser (ctx, email) {
        const exists = await this.userExists(ctx, email);
        if (!exists) {
            throw new Error(`The user with email ${email} does not exists`);
        }

        const userBuffer = await ctx.stub.getState(email);
        const user = JSON.parse(userBuffer.toString())
        console.log(user);
        return user;
    }
}

class PropertyAssetContract extends UserContract {

    async propertyAssetExists(ctx, propertyAssetId, owner) {
        const assetKey = ctx.stub.createCompositeKey(owner, [propertyAssetId]);
        const buffer = await ctx.stub.getState(assetKey);
        return (!!buffer && buffer.length > 0);
    }

    async createPropertyAsset(ctx, propertyAssetId, data, owner) {
        const propertyAssetData = JSON.parse(data)
        console
        const exists = await this.propertyAssetExists(ctx, propertyAssetId, owner);
        if (exists) {
            throw new Error(`The property asset ${propertyAssetId} already exists`);
        }
        const asset = new PropertyAsset(propertyAssetId, owner, propertyAssetData);
        
        const buffer = Buffer.from(JSON.stringify(asset));
        const assetKey = ctx.stub.createCompositeKey(owner, [propertyAssetId]);
        await ctx.stub.putState(assetKey, buffer);
    }

    async readPropertyAsset(ctx, propertyAssetId, owner) {
        const assetKey = ctx.stub.createCompositeKey(owner, [propertyAssetId]);
        const exists = await this.propertyAssetExists(ctx, propertyAssetId, owner);
        if (!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }
        const buffer = await ctx.stub.getState(assetKey);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updatePropertyAsset(ctx, propertyAssetId, data, owner) {
        const propertyAssetData = JSON.parse(data)
        const assetKey = ctx.stub.createCompositeKey(owner, [propertyAssetId]);
        const exists = await this.propertyAssetExists(ctx, propertyAssetId, owner);
        if (!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }
        const asset = new PropertyAsset(propertyAssetId, owner, propertyAssetData)
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(assetKey, buffer);
    }

    async transferPropertyOwnership(ctx, propertyAssetId, owner, newOwner) {
        const assetKey = ctx.stub.createCompositeKey(owner, [propertyAssetId]);
        const propertyBytes = await ctx.stub.getState(assetKey); 
        if (!propertyBytes || propertyBytes.length === 0) {
            throw new Error(`${propertyAssetId} does not exist`);
        }
        const property = JSON.parse(propertyBytes.toString());
        property.owner = newOwner;

        await ctx.stub.putState(assetKey, Buffer.from(JSON.stringify(property)));

        const transferEvent = { owner, newOwner, propertyId: property.PropertyAssetId };
        ctx.stub.setEvent('Transfer', Buffer.from(JSON.stringify(transferEvent)));

        return true;
    }

    async deletePropertyAsset(ctx, propertyAssetId, owner) {
        const assetKey = ctx.stub.createCompositeKey(owner, [propertyAssetId]);
        const exists = await this.propertyAssetExists(ctx, propertyAssetId, owner);
        if (!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }
        await ctx.stub.deleteState(assetKey);
    }

}

module.exports.UserContract = UserContract;
module.exports.PropertyAssetContract = PropertyAssetContract;

