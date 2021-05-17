const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const conn = require('./config/database');
const AppUtils = require('./utils/AppUtils');
const app = express();



// mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connection.on('connected',() => {
//     console.log("Database connected "+config.database);
// });
// mongoose.connection.on('error', (err) => {
//     console.log("Database Error "+err);
// });

app.use(cors());
app.use(bodyParser.json())

// (async () => {
//     await AppUtils.enrollAdminPbchain('org1admin', 'org1');
// })();

AppUtils.enrollAdminPbchain('admin', 'adminpw')
 .then(() => {
     console.log("Successful");
 })
 .catch(err => {
     console.error(err);
 })

 let ccp = AppUtils.buildCCPOrg3();
 AppUtils.enrollAdmin(ccp, 'Org3', 'admin', 'adminpw')
 .then(() => {
     console.log("Successful");
 })
 .catch(err => {
     console.error(err);
 })
// conn.sync({force : true})
conn.sync()



const users = require('./routes/users');
app.use('/user', users);

const properties = require('./routes/properties');
app.use('/property', properties);

const agencies = require('./routes/real-estate-agencies');
app.use('/agency', agencies);

const developers = require('./routes/developers');
app.use('/developer', developers)

const buyRequests = require('./routes/buy-requests');
app.use('/buy', buyRequests);

const wallet = require('./routes/wallet');
app.use('/wallet', wallet);

app.get('/', (req, res, next) => {
    res.send("Invalid Endpoint")
})

app.listen(3000, ()=> {
    console.log("listening at port 3000")
})