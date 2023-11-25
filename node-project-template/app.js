const express= require('express');

const shirtRouter = require('./routes/shirtRoutes');

const app = express();



app.use('/shirts', shirtRouter);

module.exports = app;