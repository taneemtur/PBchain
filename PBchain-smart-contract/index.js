/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const PropertyAssetContract = require('./lib/property-asset-contract').PropertyAssetContract;
const UserContract = require('./lib/property-asset-contract').UserContract;

module.exports.PropertyAssetContract = PropertyAssetContract;
module.exports.UserContract = UserContract;
module.exports.contracts = [ PropertyAssetContract, UserContract ];
