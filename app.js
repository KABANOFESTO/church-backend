const express = require('express');
const app = express();
const cors = require('cors');
const { json } = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { dbConnect } = require('./src/config/db.config');
const fileUploader = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();
dbConnect()

const usersRoutes = require('./src/routes/userRouter');
// const googleRouter = require('./src/routes/googleAuth');
const blogRouter = require('./src/routes/blogRouter');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUploader({ useTempFiles: true }));
app.use(cors());
app.use(json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/users', usersRoutes);
// app.use('/google', googleRouter);
app.use('/blog', blogRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;