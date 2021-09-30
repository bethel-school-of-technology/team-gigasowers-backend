var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//loads VeggieTender config file
const dotenv = require('dotenv');    
dotenv.config({ path: './config/config.env'});
//loads VeggieTender DB
const connectDB = require('./config/db');  


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//app is running on PORT 5000
var app = express();


//Connect to Mongo VeggieTenderDB
connectDB();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);  //will be using this route for VeggieTender API's

module.exports = app;
