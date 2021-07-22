const express = require('express');
const router = express.Router();

const User = require('../conn/user')

const passport = require('passport');
/*
GET /api/user/login   страница с формой входа / регистрации
GET /api/user/me      страница профиля
POST /api/user/login
POST /api/user/signup
*/
router.get('/login', async (req, res) => {
    res.render("user/index", {
        title: "Вход"
    });
});

router.post('/login',   
    passport.authenticate('local', {    successRedirect: '/',
                                        failureRedirect: '/login',
                                        failureFlash: true })
);

router.get('/create', async (req, res) => {
    res.render("user/index", {
        title: "Регистрация"
    });
});

router.post('/create', async (req, res) => {
    const {username, password} = req.body;
    const newUser = new User({
        user, password
    });
    try {
        await newUser.save();
        res.redirect('/user/login');
    } catch (e) {
        console.error(e);
    }
});


module.exports = router;
