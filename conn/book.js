const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = 'Book'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'
        
const conn = mongoose.createConnection(HostDb, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const schema = require('../models/book')
//const schema = new mongoose.Schema({ title: 'string', description: 'string', authors: 'string', favorite: 'string', fileCover: 'string', fileName: 'string', fileBook: 'string', date: 'string'});
module.exports = conn.model('Book', schema);