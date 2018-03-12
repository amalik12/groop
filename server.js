const express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var verifyToken = require('./verifyToken');
var generate = require('./generateId');
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

var NUM_AVATARS = 8;

app.head('/auth', verifyToken, function (req, res) {
  User.findById(req.userId, function (err, user) {
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
        if (err) console.error(err);
        res.sendStatus(404);
      }
    })
  } else {
    res.sendStatus(404);
  }  
})

app.get('/api/v1/rooms/:id', function (req, res) {
  Room.findOne({ shortid: req.params.id }, { _id: 0 }, function (err, room) {
    if (err) return res.sendStatus(500);
    if (!room) return res.sendStatus(404);
    return res.status(200).send(room);
  })
})

app.post('/api/v1/rooms/', function (req, res) {
  if (!req.body || !req.body.name) return res.sendStatus(400);
  let shortid;
  let count;
  Room.count({}).then((result) => {
    count = result + 1;
    if (req.body.shortid) {
      // remove non URL-safe characters
      shortid = req.body.shortid.replace(/[^a-zA-Z0-9-_]/g, '');
    } else {
      shortid = generate(count)
    }
    return Room.create({ name: req.body.name, shortid: shortid })
  })
  .then((room) => {
    return res.status(200).send(room);
  })
  .catch((err) => {
    console.error(err);
    if (err) return res.sendStatus(500);
  })
})

app.post('/api/v1/rooms/:id/messages', verifyToken, function (req, res) {
  if (!req.body || !req.body.message) return res.sendStatus(400);
  Message.create({ text: req.body.message, user: req.userId, room: req.params.id })
  .then((message) => {
    return Message.findById(message.id).populate('user', { password: 0 }).exec()
  })
  .then((message) => {
    io.emit('message', message);
    return res.sendStatus(200);
  })
  .catch((err) => {
    console.error(err);
    return res.sendStatus(500);
  })
})

app.get('/api/v1/rooms/:id/messages', verifyToken, function (req, res) {
  Message.find({ room: req.params.id }).populate('user', { password: 0 }).exec(function (err, messages) {
    if (err) return res.sendStatus(500);
    if (!messages) return res.sendStatus(404);
    res.status(200).send(messages)
  })
})

app.post('/login', function (req, res) {
  User.findOne({ name: req.body.name }, function (err, user) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);
    bcrypt.compare(req.body.password, user.password, function (err, isValid) {
      if (err) console.error(err);
      if (isValid) {
        var token = jwt.sign({ id: user._id }, secret, {
          expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
      } else {
        res.sendStatus(401);
      }
    });
  })
})

app.post('/register', function (req, res) {
  bcrypt.genSalt(12, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) console.error(err);
      var avatar_id = Math.floor(Math.random() * NUM_AVATARS + 1);
      User.create({ name: req.body.name, password: hash, avatar: 'default-' + avatar_id + '.png' }, function (err, user) {
        if (err) return res.sendStatus(500);
        if (!user) return res.sendStatus(404);
        var token = jwt.sign({ id: user._id }, secret, {
          expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
      })
    });
  });
})

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    User.findByIdAndUpdate(socket.user, { room: undefined })
    .then((user) => {
      if (!user) throw Error('Disconnect: user not found');
      return User.find({ room: socket.room }, { password: 0 })
    })
    .then((users) => {
      if (!users) throw Error('room is empty');
      io.emit('current users', users);
    })
    .catch((err) => {
      console.error(err);
    })
  });
  
  socket.on('user', function (data) {
    jwt.verify(data.user, secret, function (err, decoded) {
      if (err) console.error(err);
      socket.user = decoded.id;
      socket.room = data.room;
      User.findByIdAndUpdate(decoded.id, { room: data.room })
      .then((user) => {
        if (!user) throw Error('Connect: user not found');
        return User.find({ room: data.room }, { password: 0 })
      })
      .then((users) => {
        if (!users) throw Error('room is empty');
        io.emit('current users', users);
      })
      .catch((err) => {
        console.error(err);
      })
    });
  });
});