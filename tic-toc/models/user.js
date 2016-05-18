// User model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: false },
  session_id: Number,
  friend_list: [],
  bio: String,
  created_at: Date,
  updated_at: Date

});

module.exports = mongoose.model('User', UserSchema);
