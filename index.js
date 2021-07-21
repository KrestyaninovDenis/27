const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));//false
app.set("view engine", "ejs");

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