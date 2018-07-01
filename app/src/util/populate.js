var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/chat_db';
var Room = require('./models/room.js');
var User = require('./models/user.js');

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB)
  .then(() =>  console.log('Database connection succesful'))
  .catch((err) => console.error(err));

Room.create({ name: 'room' }, function (err, instance) {
  	if (err) return next(err);
  	console.log('record created');
});

User.create({ name: 'Guy' }, function (err, instance) {
  	if (err) return next(err);
  	console.log('record created');
});