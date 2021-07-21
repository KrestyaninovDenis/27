const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));//false
app.set("view engine", "ejs");


//************************************************************ */

var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(username, password,done){
  User.findOne({ user : username},function(err,user){
    return err 
      ? done(err)
      : user
        ? password === user.password
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password.' })
        : done(null, false, { message: 'Incorrect username.' });
  });
}));
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
      err 
        ? done(err)
        : done(null,user);
    });
  });
  app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
 
// Passport:
app.use(passport.initialize());
app.use(passport.session());
app.post('/user/login',                  controllers.users.login);
module.exports.login = function(req, res, next) {
    passport.authenticate('local',
      function(err, user, info) {
        return err 
          ? next(err)
          : user
            ? req.logIn(user, function(err) {
                return err
                  ? next(err)
                  : res.redirect('/private');
              })
            : res.redirect('/');
      }
    )(req, res, next);
  };
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