
// BASE SET UP
// ============================================
// call packages
var express = require('express'); //call express
var app = express(); //define app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// connect to remote mongolabs db
mongoose.connect(process.env.DB_CONN_TIC_TAC);

// configure app to use bodyParser()
// will let us get data from a POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// set port to 8080
var port = process.env.PORT || 8080;
// ROUTES FOR API
// ============================================

// get instance of express Router
var router = express.Router();

// test route to make sure everything is working (GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({message: 'welcome to the phungame api!' });
});

// more api routes happen here

// REGISTER ROUTES
// all routes prefixed with /api
app.use('/api', router);

//START SERVER
// ======================
app.listen(port);
console.log('MAGIC happens on the PhunGame port ' + port );
