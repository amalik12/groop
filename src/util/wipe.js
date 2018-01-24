var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/chat_db';
var Room = require('../../models/room.js');
var User = require('../../models/user.js');
var Message = require('../../models/message.js');

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB)
    .then(() => console.log('Database connection succesful'))
    .catch((err) => console.error(err));

// Room.remove({}, function (err, instance) {
//     if (err) return next(err);
//     console.log('rooms wiped');
// });

User.remove({}, function (err, instance) {
    if (err) return next(err);
    console.log('users wiped');
});

Message.remove({}, function (err, instance) {
    if (err) return next(err);
    console.log('messages wiped');
});