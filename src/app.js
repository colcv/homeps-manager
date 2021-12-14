const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// ERRORS HANDLERS
const errorHandler = require('./middlewares/error-handler');
const notFoundHandler = require('./middlewares/not-found-handler');

// ROUTERS
const authRouter = require('./routes/auth-routes');
const userRouter = require('./routes/user-routes');

// INITILIZE APP
const app = express();

// GLOBAL MIDDLEWARES
// enable cors
app.use(cors());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body parser, reading data from body into req.body
app.use(express.json());

// cookie parser, writing cookie into req.signedCookies
app.use(cookieParser(process.env.JWT_SECRET));

// ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
