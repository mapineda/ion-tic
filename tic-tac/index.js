// import express module
var express = require('express');

var path = require('path');

var favicon = require('serve-favicon');

var logger = require('morgan');

var bodyParser = require('body-parser');
//import mongoose
var mongoose = require('mongoose');
//mongoose connect
mongoose.connect('url', function(err) {
  if(err) {
    console.log('connection error', err);
  } else {
    console.log('connection success');
  }
});

var routes = require('')

// create new instance of Express
var app = express();


require('./config')(app);
require('./models')(app);
