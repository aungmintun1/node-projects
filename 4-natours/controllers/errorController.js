module.exports = (err, req, res, next) => {
    // console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // if there's not status code or status then it is by default 500 and error

    res.status(err.statusCode).json({
    status: err.status,
    message: err.message
    });
    }; 