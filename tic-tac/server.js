var express = require('express');
var app = express();

var bodyParser = require('body-parser');

require('./config')(app);
require('./models')(app);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  if('OPTIONS' === req.method) {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(express.static(_dirname + '/adminpanel'));
app.get('/add-friend', function (req, res) {
  res.sendFile(_dirname + '/adminpanel/add-friend.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var router = express.Router();
app.set('router', router);
app.use(router);

var http = require('http');

http.createServer(app)
  .listen(config.PORT, function() {
    console.log('PhunGames start on port ' + config.PORT  );
  });
