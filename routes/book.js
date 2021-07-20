const express = require('express');
const router = express.Router();

const Book = require('../conn/book')
const User = require('../conn/user')

router.get('/', async (req, res) => {
    const book = await Book.find({});
    res.render("book/index", {
        title: "Библиотека",
        books: book,
    });
//******************************* */
    const newUser = new User({
        title:"11", description:"11"
    });
        await newUser.save();

//*********************************************** */
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Создание книги",
        book: {},
    });
});

router.post('/create', async (req, res) => {
    const {title, description, authors} = req.body;

    const newTodo = new Book({
        title, description, authors
    });
//    const newUser = new User({
//        title, description
//    });

    try {
        await newTodo.save();
//        await newUser.save();
        res.redirect('/book');
    } catch (e) {
        console.error(e);
    }
});


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("book/view", {
        title: "Просмотр книги",
        book: book,
    });
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("book/update", {
        title: "Обновление книги",
        book: book,
    });
});

router.post('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {title, description, authors} = req.body;

    try {
        await Book.findByIdAndUpdate(id, {title, description, authors});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/book/${id}`);
});

router.post('/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/book`);
});


module.exports = router;
