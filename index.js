const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use('/user', userRouter);
app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = 'todos'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'

async function start() {
    try {
        
const conn = mongoose.createConnection(HostDb, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const schema = new mongoose.Schema({ title: 'string', description: 'string', authors: 'string', favorite: 'string', fileCover: 'string', fileName: 'string', fileBook: 'string', date: 'string'});

conn.model('Book', schema);

//const conn002 = mongoose.createConnection(process.env.MONGODB_URI);
//conn002.model('PageView', require('../schemas/pageView'));
            
/*          await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
*/

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}
start();


