const express = require ('express');
const bodyParser = require ('body-parser');

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



//******************************* PASSPORT */
//подключение стратегии
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
    passport.use(new LocalStrategy({
        usernameField: 'user',
        passwordField: 'password'
    },  function (username, password, done) {
            User.findOne({ username : username},function(err,user){
            if (err) { return done(err) }
            if (!user) { return done(null, false) }
            if (!db.users.verifyPassword(user, password)) { return done(null, false) }
            return done(null, user) // `user` будет сохранен в `req.user`
            });
    }));
//Для того, чтобы сохранять или доставать пользовательские данные из сессии
passport.serializeUser(function (user, cb) {
    cb(null, user.id)
})
passport.deserializeUser(function (id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) { return cb(err) }
        cb(null, user)
    })
})
//подключить паспорт к экспрессу
// Middlewares, которые должны быть определены до passport:
app.use(express.cookieParser());
//app.use(express.bodyParser()); вроде есть уже
app.use(express.session({ secret: 'SECRET' }));
// Passport:
app.use(passport.initialize());
app.use(passport.session());























const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Старт сервера на: ${PORT}`);
})