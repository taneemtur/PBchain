/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const Contract = require('./lib/property-asset-contract');

module.exports.UserContract = Contract.UserContract;
module.exports.PropertyAssetContract = Contract.PropertyAssetContract;
module.exports.contracts = [ Contract.UserContract, Contract.PropertyAssetContract ];
