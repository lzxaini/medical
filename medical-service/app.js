var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var express = require('express');
var path = require('path');
var { authJwt, tokenInterceptor } = require('./utils/jwtConfig')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(authJwt) // token
app.use(tokenInterceptor) // 拦截器

var userRouter = require('./routes/user.js');
var loginRouter = require('./routes/login.js');
var uploadFileRouter = require('./routes/uploadFile.js');
var topicRouter = require('./routes/topic.js');
var pushRouter = require('./routes/push.js');
var informRouter = require('./routes/inform.js');

app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/upload', uploadFileRouter);
app.use('/api/topic', topicRouter);
app.use('/api/push', pushRouter);
app.use('/api/inform', informRouter);

//静态资源托管
app.use(express.static(path.join(__dirname, 'public')));
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/user', userRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
