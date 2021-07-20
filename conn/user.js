const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = 'User'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'
        
const conn = mongoose.createConnection(HostDb, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const schema = require('../models/user')
const schema1 = require('../models/book')
const shm1 = conn.model('User1', schema1);
module.exports = conn.model('User', schema);