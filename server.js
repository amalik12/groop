const express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
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
        if (err) console.error('error: ' + err);
        res.sendStatus(404);
      }
    })
  } else {
    res.sendStatus(404);
  }  
})

app.get('/api/v1/room/:id', function (req, res) {
  Room.findById(req.params.id, function (err, room) {
    if (err) return res.sendStatus(500);
    if (!room) return res.sendStatus(404);
    return res.status(200).send(room);
  })
})

app.post('/api/v1/room/:id/messages', verifyToken, function (req, res) {
  if (!req.body || !req.body.message) {
    return res.sendStatus(400);
  }
  User.findById(req.userId, { password: 0 }, function (err, user) {
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
      return User.findOne({ _id: message.user }, { password: 0 }, function (err, user) {
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
      var numAvatars = 8
      var avatar_id = Math.floor(Math.random() * numAvatars + 1);
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
    User.findByIdAndUpdate(socket.user, { room: undefined }, function (err, user) {
      if (err) console.error(err);
      if (!user) console.log('user not found');
      User.find({ room: socket.room }, { password: 0 }, function (err, users) {
        if (err) console.error(err);
        if (!users) console.log('user not found');
        io.emit('current users', users);
      })
    })
  });
  
  socket.on('user', function (data) {
    jwt.verify(data.user, secret, function (err, decoded) {
      if (err) console.error(err);
      socket.user = decoded.id;
      socket.room = data.room;
      User.findByIdAndUpdate(decoded.id, { room: data.room }, function (err, user) {
        if (err) console.error(err);
        if (!user) console.log('user not found');
        User.find({ room: data.room }, { password: 0 },function (err, users) {
          if (err) console.error(err);
          if (!users) console.log('user not found');
          io.emit('current users', users);
        })
      });
    });
  });
});