const {Schema, model} = require('mongoose');

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = 'todos'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'

//async function start() {
//    try {
        
const conn = mongoose.createConnection(HostDb, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const schema = new mongoose.Schema({ title: 'string', description: 'string', authors: 'string', favorite: 'string', fileCover: 'string', fileName: 'string', fileBook: 'string', date: 'string'});


//    } catch (e) {
//        console.log(e);
//    }
//}
//start();
module.exports = conn.model('Book', schema);