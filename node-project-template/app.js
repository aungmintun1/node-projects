const express= require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController');
const shirtRouter = require('./routes/shirtRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/shirts', shirtRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(globalErrorHandler);

module.exports = app;