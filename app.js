const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected',() => {
    console.log("Database connected "+config.database);
});
mongoose.connection.on('error', (err) => {
    console.log("Database Error "+err);
});

app.use(cors());
app.use(bodyParser.json())

const users = require('./routes/users');
app.use('/users', users);

app.get('/', (req, res, next) => {
    res.send("Invalid Endpoint")
})

app.listen(3000, ()=> {
    console.log("listening at port 3000")
})