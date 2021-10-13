var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); 


const dotenv = require('dotenv');  //loads VeggieTender config file
dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');  //loads VeggieTender DB


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//app is running on PORT 5000
var app = express();

//Connect to Mongo VeggieTenderDB
connectDB();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());  //enables VeggieTender Clients to access server


app.use('/', indexRouter);
app.use('/api/users', usersRouter);  //will be using this route for VeggieTender API's

module.exports = app;
