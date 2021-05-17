const { Contract } = require('fabric-contract-api');
const UserAccount = require('./User')

const accPrefix = 'UserAccount';

class UserContract extends Contract {

    async userExists (ctx) {
        const clientId = ctx.clientIdentity.getID();
        const userAccKey = ctx.stub.createCompositeKey(accPrefix, [clientId]);
        const buffer = await ctx.stub.getState(userAccKey);
        return (!!buffer && buffer.length > 0);
    }

    async createUserAccount (ctx, data) {
        console.log(data, data.toString(), JSON.stringify(data))
        const userData = JSON.parse(data)
        const clientId = ctx.clientIdentity.getID();
        const userAccKey = ctx.stub.createCompositeKey(accPrefix, [clientId]);
        const exists = await this.userExists(ctx, userAccKey);
        if (exists) {
            throw new Error(`The user with email ${userData.email} already exists`);
        }

        const user = new UserAccount(clientId, userData.name, userData.email, userData.password);
        const buffer = Buffer.from(JSON.stringify(user));
        await ctx.stub.putState(userAccKey, buffer);
    }

    async getUser (ctx) {
        const exists = await this.userExists(ctx);
        console.log(exists)
        if (!exists) {
            throw new Error(`The user does not exists`);
        }
        const clientId = ctx.clientIdentity.getID();
        const userAccKey = ctx.stub.createCompositeKey(accPrefix, [clientId]);
        const userBuffer = await ctx.stub.getState(userAccKey);
        const user = JSON.parse(userBuffer.toString())
        console.log(user);
        return user;
    }
}

module.exports = UserContract;