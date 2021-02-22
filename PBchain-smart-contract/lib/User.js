'use strict';

class User {

    constructor (x509Cert, name, email, pnum, userType, password) {
        this.x509Cert = x509Cert;
        this.name = name;
        this.email = email;
        this.pnum = pnum;
        this.userType = userType;
        this.password = password;
    }
}

module.exports = User