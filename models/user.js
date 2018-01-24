var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  avatar: String,
  password: String,
  room: { type: Schema.Types.ObjectId, ref: 'Room' }
});

module.exports = mongoose.model('User', UserSchema);