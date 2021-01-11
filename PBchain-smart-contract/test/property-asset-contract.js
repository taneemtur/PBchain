/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { PropertyAssetContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('PropertyAssetContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new PropertyAssetContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"property asset 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"property asset 1002 value"}'));
    });

    describe('#propertyAssetExists', () => {

        it('should return true for a property asset', async () => {
            await contract.propertyAssetExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a property asset that does not exist', async () => {
            await contract.propertyAssetExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createPropertyAsset', () => {

        it('should create a property asset', async () => {
            await contract.createPropertyAsset(ctx, '1003', 'property asset 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"property asset 1003 value"}'));
        });

        it('should throw an error for a property asset that already exists', async () => {
            await contract.createPropertyAsset(ctx, '1001', 'myvalue').should.be.rejectedWith(/The property asset 1001 already exists/);
        });

    });

    describe('#readPropertyAsset', () => {

        it('should return a property asset', async () => {
            await contract.readPropertyAsset(ctx, '1001').should.eventually.deep.equal({ value: 'property asset 1001 value' });
        });

        it('should throw an error for a property asset that does not exist', async () => {
            await contract.readPropertyAsset(ctx, '1003').should.be.rejectedWith(/The property asset 1003 does not exist/);
        });

    });

    describe('#updatePropertyAsset', () => {

        it('should update a property asset', async () => {
            await contract.updatePropertyAsset(ctx, '1001', 'property asset 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"property asset 1001 new value"}'));
        });

        it('should throw an error for a property asset that does not exist', async () => {
            await contract.updatePropertyAsset(ctx, '1003', 'property asset 1003 new value').should.be.rejectedWith(/The property asset 1003 does not exist/);
        });

    });

    describe('#deletePropertyAsset', () => {

        it('should delete a property asset', async () => {
            await contract.deletePropertyAsset(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a property asset that does not exist', async () => {
            await contract.deletePropertyAsset(ctx, '1003').should.be.rejectedWith(/The property asset 1003 does not exist/);
        });

    });

});