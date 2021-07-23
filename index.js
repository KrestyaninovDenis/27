const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));//false
app.set("view engine", "ejs");


//************************************************************ */

const User = require('./conn/user')
const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : false
  },
      function(username, password, done){

        User.findOne({username:username}, (err,user) => {
        if (err) { return done(err) } //ошибка обработки
        if (!user) { return done(null, false, { message: 'ненашёл' }) }// ненашёл
        //ещё пароль надо проверить
        return done(null, user)
    });
}));

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser(function (user, cb) {
    cb(null, user.id)
  })
passport.deserializeUser(function (id, cb) {
    users.findById(id, function (err, user) {
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
  
//************************************************************************* */

// @see https://github.com/passport/express-4.x-local-example
/*
const db = require('./db')

function verify (username, password, done) {
  db.users.findByUsername(username, function (err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }

    if (!db.users.verifyPassword(user, password)) { return done(null, false) }

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
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err) }
    cb(null, user)
  })
})

app.use(require('express-session')({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())
*/
//не переносить
app.get('/login',
  function (req, res) {
    res.render('login')
  })

app.post('/login',
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