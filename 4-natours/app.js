
const express=require('express');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
//middleware that is added onto the req object



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

module.exports = app;

// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour)
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

// const tourRouter = express.Router();
// const userRouter = express.Router();
