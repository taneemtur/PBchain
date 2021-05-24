
'use strict';

const fs = require('fs');
const path = require('path');

const { Gateway, Wallet, Wallets, IdentityService } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const bcrypt = require('bcryptjs');
const { model } = require('mongoose');

module.exports.timeConverter = (timestamp) => {
	var a = new Date(timestamp*1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	return time;
}
 

module.exports.buildCCP = (org) => {
	org = org.toLowerCase();
	const ccpPath = path.resolve(__dirname, '..', '..', '..', 'hlf', 'fabric-samples', 'test-network',
		'organizations', 'peerOrganizations', `${org}.example.com`, `connection-${org}.json`);
	console.log(ccpPath)
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
}

module.exports.buildCCPOrg1 = () => {
	// if(path) {

	// }
	// else {

	// }
	// load the common connection configuration file
	console.log(__dirname)
	const ccpPath = path.resolve(__dirname, '..', '..', '..', 'hlf', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
	// const ccpPath = 'ccpOrg1.json'
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

module.exports.buildCCPOrg2 = () => {
	// load the common connection configuration file
	const ccpPath = path.resolve(__dirname, '..', '..', '..', 'hlf', 'fabric-samples', 'test-network',
		'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

module.exports.buildCCPOrg3 = () => {
	// load the common connection configuration file
	const ccpPath = path.resolve(__dirname, '..', '..', '..', 'hlf', 'fabric-samples', 'test-network',
		'organizations', 'peerOrganizations', 'org3.example.com', 'connection-org3.json');
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

module.exports.buildWallet = async (walletPath) => {
	// Create a new  wallet : Note that wallet is for managing identities.
	let wallet;
	if (walletPath) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Built a file system wallet at ${walletPath}`);
	} else {
		wallet = await Wallets.newInMemoryWallet();
		console.log('Built an in memory wallet');
	}

	return wallet;
};

module.exports.prettyJSONString = (inputString) => {
	if (inputString) {
		 return JSON.stringify(JSON.parse(inputString), null, 2);
	}
	else {
		 return inputString;
	}
}

module.exports.getWalletPath = (org) => {
	let dir = 'wallet/'+org;
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}

	return "wallet/"+org;
}

module.exports.saveAssets = (type, propertyId, i, base64Data) => {
	let dir = `assets/${type}/property/${propertyId}`;
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}

	// var base64Image = new Buffer.from(base64Data, 'binary').toString('base64');
	// var decodedImage = new Buffer.from(base64Image, 'base64').toString('binary');

	fs.writeFile(`${dir}/${i}.png`, base64Data, function(err) {
		console.log(err);
	});
}

module.exports.getCA =  (CAname, ccp) => {
    const caInfo = ccp.certificateAuthorities[CAname];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
    return ca;
}

module.exports.enrollAdminPbchain = async (adminId, adminPass) => {
	try {
        // load the network configuration
		const ccp = this.buildCCPOrg1();

        // Create a new CA client for interacting with the CA.
       const ca = this.getCA('ca.org1.example.com', ccp);

        // Create a new file system based wallet for managing identities.
        const walletPath = this.getWalletPath('Org1')
        const wallet = await this.buildWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get(adminId);
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: adminId, enrollmentSecret: adminPass });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(adminId, x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');

		const userContract = await this.connectToNetwork('Org1', ccp, 'mychannel', 'UserContract', 'admin');
		const adminUser = {
			name : 'admin',
			email : 'admin@org1.example.com',
			password : 'adminpw'
		}
		await userContract.submitTransaction('createUserAccount', JSON.stringify(adminUser));

    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}

module.exports.enrollAdmin = async (ccp, org, adminId, adminPass) => {
	try {
        // load the network configuration
		// const ccp = this.buildCCPOrg1();

        // Create a new CA client for interacting with the CA.
       const ca = this.getCA(`ca.${org.toLowerCase()}.example.com`, ccp);

        // Create a new file system based wallet for managing identities.
        const walletPath = this.getWalletPath(org)
        const wallet = await this.buildWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get(adminId);
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: adminId, enrollmentSecret: adminPass });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: `${org}MSP`,
            type: 'X.509',
        };
        await wallet.put(adminId, x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');

		const userContract = await this.connectToNetwork(org, ccp, 'mychannel', 'UserContract', 'admin');
		const adminUser = {
			name : 'admin',
			email : `admin@${org.toLowerCase()}.example.com`,
			password : 'adminpw'
		}
		await userContract.submitTransaction('createUserAccount', JSON.stringify(adminUser));

    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}

module.exports.registerIdentity =  async (emailAddress, firstName, lastName, password) => {

    try {

        const walletPath = this.getWalletPath('Org1')
        const wallet = await this.buildWallet(Wallets, walletPath);
        console.log(`Wallet path: ${walletPath}`);
        const registerar = "admin";
        const userExists = await wallet.get(emailAddress);
        if (userExists) {
            console.error(`An identity for the user ${emailAddress} already exists in the wallet`);
            return false;
        }

        const ccp = this.buildCCPOrg1();;
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: registerar, discovery: { enabled: true, asLocalhost: true } });

        const caName = "ca.org1.example.com";
        const ca = getCA(caName, ccp);
        let adminIdentity = await wallet.get(registerar);
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, registerar);

        const secret = await ca.register({ enrollmentID: emailAddress, role: 'client', affiliation : "PBChainUser"}, adminUser);

        const enrollment = await ca.enroll({ enrollmentID: emailAddress, enrollmentSecret: secret });
        const userIdentity = createX509Identity(enrollment, "Org1MSP")
        await wallet.put(emailAddress, userIdentity);

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        console.log(hashPass)
        const contract = await connectToFabric(emailAddress);
        const usrReg = await contract.submitTransaction("createClientWalletAccount", emailAddress, firstName, lastName, hashPass);

        return {success : usrReg.toString(), msg : "User Registered."}
    } catch (error) {
        console.error(error);
        return {success : false, msg : error}
    }
};

module.exports.registerAndEnrollUser = async (caClient, wallet, orgMspId, user, affiliation) => {
	try {
		// Check to see if we've already enrolled the user
		const userIdentity = await wallet.get(user.email);
		if (userIdentity) {
			console.log(`An identity for the user ${user.email} already exists in the wallet`);
			return;
		}

		// Must use an admin to register a new user
		const adminIdentity = await wallet.get('admin');
		if (!adminIdentity) {
			console.log('An identity for the admin user does not exist in the wallet');
			console.log('Enroll the admin user before retrying');
			throw new Error('Enroll the admin user before retrying');
		}

		// build a user object for authenticating with the CA
		const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
		const adminUser = await provider.getUserContext(adminIdentity, 'admin');

		// Register the user, enroll the user, and import the new identity into the wallet.
		// if affiliation is specified by client, the affiliation value must be configured in CA
		const secret = await caClient.register({
			affiliation: affiliation,
			enrollmentID: user.email,
			role: 'client'
		}, adminUser);
		const enrollment = await caClient.enroll({
			enrollmentID: user.email,
			enrollmentSecret: secret
		});
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: orgMspId,
			type: 'X.509',
		};
		await wallet.put(user.email, x509Identity);
		console.log(`Successfully registered and enrolled user ${user.email} and imported it into the wallet`);

		const ccp = await this.buildCCPOrg1();
		const userContract = await this.connectToNetwork('Org1', ccp, 'mychannel', 'UserContract', user.email);
		console.log(user);
		await userContract.submitTransaction('createUserAccount', JSON.stringify(user));
	} catch (error) {
		console.error(`Failed to register user : ${error}`);
		throw error;
	}
};


module.exports.connectToNetwork = async (org, ccp, channel, ccn, userId) => {
	// console.log(org, ccp, channel, ccn, userId)
    const walletPath = this.getWalletPath(org);
    const wallet = await this.buildWallet(walletPath);
    const gateway = new Gateway();

    await gateway.connect(ccp, {
        wallet,
        identity: userId,
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork(channel);
    const contract = network.getContract('pbchain', ccn);

    return contract;
}

module.exports.getContract = async (org, channel, ccn, userId) => {
	const ccp = this.buildCCP(org);
	const walletPath = this.getWalletPath(org);
    const wallet = await this.buildWallet(walletPath);
    const gateway = new Gateway();

    await gateway.connect(ccp, {
        wallet,
        identity: userId,
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork(channel);
    const contract = network.getContract('pbchain', ccn);

    return contract;
}