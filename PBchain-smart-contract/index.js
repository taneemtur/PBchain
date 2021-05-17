/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const PropertyAssetContract = require('./lib/property-asset-contract');
const UserContract = require('./lib/user-contract');
const WalletTokenContract = require('./lib/token-contract');

module.exports.UserContract = UserContract;
module.exports.PropertyAssetContract = PropertyAssetContract;
module.exports.WalletTokenContract = WalletTokenContract;
module.exports.contracts = [ UserContract, PropertyAssetContract, WalletTokenContract];
