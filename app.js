const express = require('express');
const app = express();

const usersRoutes = require('./src/routes/userRouter');

app.use('/users', usersRoutes);

module.exports = app;