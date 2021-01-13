
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
var cors= require('cors');
var app = express();

//require('./config/passport-config');

const db = mongoose.connection;

app.use(cors())


//DataBase setup ;
//const dbUri='mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME;
const dbUri='mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
console.log(dbUri);
mongoose.connect(dbUri,{useNewUrlParser: true,useUnifiedTopology: true});

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open',  ()=> { 
  console.log('Database connected');
});


var indexRouter = require('./routes/index');
//var libraryRouter= require('./routes/library');
//var usersRouter=require('./routes/users');
//var moviesRouter= require('./routes/movies');
//var authRouter= require('./routes/auth');
var productsRouter= require('./routes/product');
var locationRouter= require('./routes/location');
var movementRouter= require('./routes/productMovement');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/', indexRouter);
//app.use('/api/library', libraryRouter)
app.use('/api/products/',productsRouter);
app.use('/api/locations/', locationRouter);
app.use('/api/transport/', movementRouter);
//app.use('/api', usersRouter);
//app.use('/api/movies',moviesRouter);
//app.use('/api/auth',authRouter)

//app.get('/api/auth/google',passport.authenticate('google'), {scope:['profile','email']});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err,req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message);
  // // render the error page
  // res.status(err.status || 500);
  // res.send(err);
  res.status(err.status || 500).json({status: "failure",reason:err.message})
});

module.exports = app;

