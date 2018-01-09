const express = require('express');
var app = express();
const path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://127.0.0.1/chat_db';

var Room = require('./models/room.js');
var User = require('./models/user.js');

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res){
 res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.head('/api/v1/users', function(req, res){
  if (req.query.name) {
    User.findOne({ name: req.query.name }, function (err, user) {
      if (user) {
        res.sendStatus(200);
      } else {
        if (err) console.error('error: ' + err);
        res.sendStatus(404);
      }
    })
  } else {
    res.sendStatus(404);
  }
})

mongoose.connect(mongoDB)
.then(() =>  console.log('Database connection succesful'))
.catch((err) => console.error(err));


io.on('connection', function(socket){
 let numUsers = io.engine.clientsCount;
 Room.findOne({ name: 'room' }, function (err, room) {
  if (err) console.error(err);
  socket.emit('room info', room);
})

 socket.on('disconnect', function(){
  console.log('user disconnected');
  numUsers = io.engine.clientsCount;
  io.emit('user count', numUsers);
});

 socket.on('message', function(txt){
   console.log('message: ' + txt);
   let message = {
     text: txt,
     time: Date.now(),
   }
   io.emit('message', message);
 });

 io.emit('user count', numUsers);
});

http.listen(5000, function(){
 console.log('Listening on port 5000');
});