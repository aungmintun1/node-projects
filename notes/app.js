
const express= require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
//middleware that is added onto the req object
app.use(morgan('dev'));

//middleware routes
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
    });

    app.use((req, res, next) => {
        req.requestTime = new Date().toISOString();
        next(); 
    });

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);


module.exports = app;


