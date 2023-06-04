const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const appError = require('./utils/appError');
const answerRouter = require('./routes/answer.routes');
const questionRouter = require('./routes/question.routes');
const userRouter = require('./routes/user.routes');
const globalErrHandler = require('./controllers/errorController');

const app = express();
app.enable('trust proxy');

///  middleware
//implement of cors
app.use(cors());

app.options('*', cors());
//static files
app.use(express.static(path.join(__dirname, 'public')));

//headers
// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'default-src': ['*']
    }
  })
);

app.use(morgan('dev'));
///rate limiter
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests from this ip ,please try again after an hour.'
});
app.use('/', limiter);

//req.body parser

app.use(express.json({ limit: '10kb' }));

///sanitize data againt nosqel query attacks
app.use(mongoSanitize());

////sanitize data againt xss attacks
app.use(xss());

/////prevent parameter polution
app.use(
  hpp({
    whitelist: ['duration']
  })
);

///  routes

app.use('/api/question', questionRouter);
app.use('/api/answer', answerRouter);
app.use('/api/user', userRouter);

app.all('*', (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrHandler);

module.exports = app;
