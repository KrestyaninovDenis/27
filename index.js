const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));//false
app.set("view engine", "ejs");


//************************************************************ */


const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./conn/user')

/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
 */
function verify (user, password, done) {
  db.findOne(user, function (err, user) {
    //if (err) { return done(err) }
    //if (!user) { return done(null, false) }

    //if (!db.users.verifyPassword(user, password)) { return done(null, false) }

    // `user` будет сохранен в `req.user`
    return done(null, user)
  })
}

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
}

//  Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, verify))

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser(function (user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(function (id, cb) {
  db.findById(id, function (err, user) {
    if (err) { return cb(err) }
    cb(null, user)
  })
})

app.use(require('express-session')({
  secret: "SECRET",
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())


app.post('/user/login',
  passport.authenticate(
    'local',
    {
      failureRedirect: '/login',
    },
  ),
  function (req, res) {
    console.log("req.user: ", req.user)
    res.redirect('/')
  })


//************************************************************* */

const errorMiddleware = require('./middleware/error');
const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user')
app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use('/user', userRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Старт сервера на: ${PORT}`);
})