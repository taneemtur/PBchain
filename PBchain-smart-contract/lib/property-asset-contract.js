
'use strict';

const { Contract } = require('fabric-contract-api');

class PropertyAssetContract extends Contract {

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
