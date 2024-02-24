const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const threadRouter = require('./routes/threadRoutes');
const commentRouter = require('./routes/commentRoutes');
const viewRouter = require('./routes/viewRoutes');
const likeRouter = require('./routes/likeRoutes');
const likecommentRouter = require('./routes/likecommentRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 
app.engine("pug", require("pug").__express);

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com");
    next();
  });
  

//connects public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

app.use('/', viewRouter);
app.use('/users',userRouter)
app.use('/threads',threadRouter)
app.use('/comments',commentRouter)
app.use('/likes',likeRouter)
app.use('/commentLikes',likecommentRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;