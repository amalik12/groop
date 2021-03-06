var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  text: String,
  creation_time: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  quote: { type: Schema.Types.ObjectId, ref: 'Message' },
  room: String,
});

module.exports = mongoose.model('Message', MessageSchema);