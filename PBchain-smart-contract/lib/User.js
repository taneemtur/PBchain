'use strict';

class UserAccount {

    constructor (x509Cert, name, email, password) {
        this.x509Cert = x509Cert;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

module.exports = UserAccount