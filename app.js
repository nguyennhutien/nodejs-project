const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const debug = require('debug')('app');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const adminRouter = require('./routes/admin');
const apiUsersRouter = require('./routes/api.users');

const app = express();

app.log = debug;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// register partials
hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerPartials(`${__dirname}/views/pages`);

// register helper
hbs.registerHelper('inc', value => parseInt(value) + 1);

app.use(logger('dev'));
app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/admin', adminRouter);
app.use('/api-users', apiUsersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.start = (PORT, MONGO_URL) => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      debug('Database connect success');
      app.listen(PORT, () => console.log('App started and listening on port', PORT));
    })
    .catch((err) => {
      debug(`Database connection error:${err}`);
    });
};

module.exports = app;
