var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

  'use strict'

  var userSchema = new Schema({
    socialID: {type: String, index: true, unique: true},
    username: {type: String, unique: true},
    deviceToken: {type: String, unique: true},
    deviceRegistered: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
  });

  mongoose.model('Users', UserSchema, 'Users');
};
