const express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jwt = require('jsonwebtoken');
var verifyToken = require('./verifyToken');
require('dotenv').config();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://127.0.0.1/chat_db';
var secret = process.env.TOKEN_SECRET;

var Room = require('./models/room.js');
var User = require('./models/user.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res){
 res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.head('/auth', verifyToken, function (req, res) {
  User.findOne({ _id: req.userId }, function (err, user) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);
    res.sendStatus(200);
  })
})

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

app.post('/login', function (req, res) {
  console.log(req.body);
  User.findOne({ name: req.body.name }, function (err, user) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);
    var token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400 
    });
    res.status(200).send({ auth: true, token: token });
  })
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