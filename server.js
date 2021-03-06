require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('Mongoose Connected Successfully');
});

connection.on('error', (err) => {
    console.log(`Mongoose default connection error: ${err}`)
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express.static(__dirname + '/client/build/'));
app.get('*', (req, res) => {
    res.sendFile(__dirname + 'client/build/index.html');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Magic is happening on port ${PORT}`);
});