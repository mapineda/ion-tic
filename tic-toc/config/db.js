var config = require('./config/db');
var mongoose = require("mongoose");

var connect = function(){
var options = {
  server: {
     socketOptions:{
        keepAlive : 1
     }
  }
};
mongoose.connect(process.env.DB_CONN_TIC_TAC);
};
connect();
