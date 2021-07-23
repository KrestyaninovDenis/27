const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../conn/user')
/*
GET /api/user/login   страница с формой входа / регистрации
GET /api/user/me      страница профиля
POST /api/user/login
POST /api/user/signup
*/

router.get('/login', async (req, res) => {
    res.render("user/index", {
        title: "Вход",
        user: req.user
    });
});

router.post('/login',
    passport.authenticate('local', {    successRedirect: '/',
                                        failureRedirect: '/user/login'})
);


router.get('/create', async (req, res) => {
    res.render("user/index", {
        title: "Регистрация",
        user: req.user
    });
});

router.post('/create', async (req, res) => {
    const {username, password} = req.body;
    const newUser = new User({
        username:username, password:password
    });
    try {
        await newUser.save();
        passport.authenticate('local', {    successRedirect: '/',
                                            failureRedirect: '/user/login'});
//        res.redirect('/');
    } catch (e) {
        console.error(e);
    }
});


module.exports = router;
