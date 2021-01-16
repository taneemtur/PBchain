
'use strict';

const { Contract } = require('fabric-contract-api');
const { User } = require('./User');

// const userPrefix = 'User';

class PropertyAssetContract extends Contract {

    async userExists (ctx, email) {
        const buffer = await ctx.stub.getState(email);
        return (!!buffer && buffer.length > 0);
    }

    async createUserAccount (ctx, userData) {
        const clientId = await ctx.stub.ClientIdentity().getID();
        const exists = await this.userExists(ctx, userData.email);
        if (exists) {
            throw new Error(`The user with email ${userData.email} already exists`);
        }

        const user = new User(clientId, userData.email, userData.name, userData.pnum, userData.userType, userData.password);
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

    async propertyAssetExists(ctx, propertyAssetId) {
        const buffer = await ctx.stub.getState(propertyAssetId);
        return (!!buffer && buffer.length > 0);
    }

    async createPropertyAsset(ctx, propertyAssetId, value) {
        const exists = await this.propertyAssetExists(ctx, propertyAssetId);
        if (exists) {
            throw new Error(`The property asset ${propertyAssetId} already exists`);
        }
        const asset = { value };
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

    async updatePropertyAsset(ctx, propertyAssetId, newValue) {
        const exists = await this.propertyAssetExists(ctx, propertyAssetId);
        if (!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(propertyAssetId, buffer);
    }

    async deletePropertyAsset(ctx, propertyAssetId) {
        const exists = await this.propertyAssetExists(ctx, propertyAssetId);
        if (!exists) {
            throw new Error(`The property asset ${propertyAssetId} does not exist`);
        }
        await ctx.stub.deleteState(propertyAssetId);
    }

}

module.exports = PropertyAssetContract;
