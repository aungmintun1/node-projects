const path = require('path');
const cors = require('cors');
const express= require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController');
const shirtRouter = require('./routes/shirtRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();



app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 
app.engine("pug", require("pug").__express);

//connects public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://cdnjs.cloudflare.com");
  next();
});

app.use((req,res,next) => {
req.requestTime = new Date().toISOString();
console.log(req.cookies);
next()
})

app.use('/', viewRouter);
app.use('/users',userRouter);
app.use('/shirts', shirtRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(globalErrorHandler);

module.exports = app;