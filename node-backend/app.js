var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var logger = require('morgan');
var cors = require('cors');
var cnv = require('canvas');
var renderer = require('./renderer');


// ##### IMPORTANT
// ### Your backend project has to switch the MongoDB port like this
// ### Thus copy paste this block to your project
const MONGODB_PORT = process.env.DBPORT || '27017';
const db = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-2223`); // connect to database omm-2021
console.log(`Connected to MongoDB at port ${MONGODB_PORT}`)
// ######

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memesRouter = require('./routes/memes');
var templatesRouter = require('./routes/templates');


var app = express();
app.use(cors());

//Load fonts
renderer.loadFonts();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//TODO: add cnv
app.use(function(req,res,next){ 
  req.db = db;
  next();
});


// the login middleware. Requires jwt authentication
app.use((req,res,next) => {
      //default user
      req.username = 'anonymous';

      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      console.log(authHeader);

      //no valid token
      if(!token) {
        next()
        console.log("not logged in");
      }
      else{
        jwt.verify(token, process.env.SERVERKEY,(err, parsedToken)=>{
          if(err) return res.status(403).json("Authtoken invalid");
          console.log("Verified token: ", parsedToken);
          req.username = parsedToken.user;
        })
        next();
      }


      //next();

      /* res.set('WWW-Authenticate', 'Basic realm="401"')
      res.status(401).send() */
})



app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/memes', memesRouter);
app.use('/templates', templatesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
