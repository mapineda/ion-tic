
// BASE SET UP
// ============================================
// call packages
var express = require('express'); //call express
var app = express(); //define app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/db');
//get the mongoose model user
var User = require('./models/user');
// set port to 8080
var port = process.env.PORT || 8080;

var jwt = require('jwt-simple');

//get request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//log to console
app.use(morgan('dev'));

//Use the passport package the application
app.use(passport.initialize());

//demo route (GET http://localhost:8080)
app.get('/', function(req, res) {
  res.send('Hello! The API is a http://localhost:' + port + '/api');
});

// connect to remote mongolabs db
mongoose.connect(process.env.DB_CONN_TIC_TAC);

//pass passport for configuration

//START SERVER
// ======================
app.listen(port);
console.log('MAGIC happens on the PhunGame port ' + port );
