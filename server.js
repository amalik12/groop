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
var Message = require('./models/message.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(mongoDB)
  .then(() => console.log('Database connection succesful'))
  .catch((err) => console.error(err));

http.listen(5000, function () {
  console.log('Listening on port 5000');
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

app.get('/api/v1/room/:id', function (req, res) {
  Room.findOne({ _id: req.params.id }, function (err, room) {
    if (err) return res.sendStatus(500);
    if (!room) return res.sendStatus(404);
    return res.status(200).send(room);
  })
})

app.post('/api/v1/room/:id/messages', verifyToken, function (req, res) {
  if (!req.body || !req.body.message) {
    return res.sendStatus(400);
  }
  User.findOne({ _id: req.userId }, function (err, user) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);
    Message.create({ text: req.body.message, user: user._id, room: req.params.id }, function (err, message) {
      if (err) return res.sendStatus(500);
      if (!message) return res.sendStatus(404);
      let output = message;
      output.user = user;
      console.log(user.name + ': ' + message.text);
      io.emit('message', output);
      return res.sendStatus(200);
    })
  })
})

app.get('/api/v1/room/:id/messages', verifyToken, function (req, res) {
  Message.find({ room: req.params.id }, function (err, messages) {
    if (err) return res.sendStatus(500);
    if (!messages) return res.sendStatus(404);
    Promise.all(messages.map((message) => {
      return User.findOne({ _id: message.user }, function (err, user) {
        if (err) console.error(error);
        if (!user) console.log(user);
        message.user = user;
      })
    }))
    .then((values) => { res.status(200).send(messages) })
  })
})

app.post('/login', function (req, res) {
  User.findOne({ name: req.body.name }, function (err, user) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);
    var token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400 
    });
    res.status(200).send({ auth: true, token: token });
  })
})

io.on('connection', function(socket){
  let numUsers = io.engine.clientsCount;
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
    numUsers = io.engine.clientsCount;
    io.emit('user count', numUsers);
  });
  
  socket.on('user disconnect', function (msg) {
    console.log(msg);
  });
  io.emit('user count', numUsers);
});