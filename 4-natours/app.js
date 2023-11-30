
const express= require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
//import error class and error handler function

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

//if the request URL doesn't go with the routes above then it goes to this middleware which applies for all requests
// it will take the typed url and put it in the error message, it will then create a error object from the class and send it to the error handler function

app.use(globalErrorHandler);


module.exports = app;

// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour)
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

// const tourRouter = express.Router();
// const userRouter = express.Router();
