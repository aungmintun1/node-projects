const express= require('express');

const shirtRouter = require('./routes/shirtRoutes');

const app = express();
app.use(express.json());



app.use('/shirts', shirtRouter);

module.exports = app;