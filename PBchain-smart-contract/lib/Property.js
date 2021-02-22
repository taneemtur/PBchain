'use strict';

class PropertyAsset {

    constructor (pId, owner, propertyDetails) {
        this.PropertyAssetId = pId;
        this.owner = owner;
        this.propertyDetails = propertyDetails;
    }

}

module.exports = PropertyAsset;