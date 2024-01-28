const express = require('express');
const userRouter = require('./routes/userRoutes');
const threadRouter = require('./routes/threadRoutes');
const commentRouter = require('./routes/commentRoutes');

const app = express();
app.use(express.json());

app.use('/users',userRouter)
app.use('/threads',threadRouter)
app.use('/comments',commentRouter)

module.exports = app;