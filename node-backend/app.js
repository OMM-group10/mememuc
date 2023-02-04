var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
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



// adapted from the code given to us in exercise 4 on authentication and databases
// the login route. Itself requires BasicAuth authentication. When successful, a JWT token is generated
app.use('/login', (req,res,next) => {
  console.log(req.headers.authorization)
  if (req.headers.authorization !== 'Basic c3R1ZGVudDpvbW1pc2F3ZXNvbWU=') { // student ommisawesome
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send()
    return
  }
  else {
    const jwt = require('njwt')
    const claims = {username: 'student'}
    const token = jwt.create(claims, 'our-server-seceret')
    token.setExpiration(new Date().getTime() + 60 * 1000)
    const jwtTokenSting = token.compact()
    res.send(jwtTokenSting)
  }
})

// the middleware being called before all other endpoints (except "/login", because "/login" is registered before this one
app.use((req,res,next) => {
  // Check if token is passed as url parameter
  if (!req.query.token){
    res.status(401).send("query parameter token is not provided")
    return;
  }
  // check if the provided token is valid
  const jwt = require('njwt')
  const { token } = req.query;
  jwt.verify(token, 'our-server-seceret', (err, verifiedJwt) => {
    if(err){
      res.status(401).send(err.message)
    }else{
      // if verification successful, continue with next middlewares
      console.log(verifiedJwt)
      next()
    }
  })
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
