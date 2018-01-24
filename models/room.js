var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new mongoose.Schema({
  name: String,
  creation_time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', RoomSchema);