const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));//false
app.set("view engine", "ejs");


//__________________________________________________________________________________________________

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
        if (!user) { return done(null, false, { message: 'ненашёл' }) }
        //if (!user.verifyPassword(password)) { return done(null, false); }//ещё пароль надо проверить
        return done(null, user)
    });
}));

passport.serializeUser(function (user, cb) {
    cb(null, user._id)
  })
passport.deserializeUser(function (_id, cb) {
    User.findById(_id, function (err, user) {
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
  
//_________________________________________________________________________________________________


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
    console.log(`START_SERVER - PORT: ${PORT}`);
})