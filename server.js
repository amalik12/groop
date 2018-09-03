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
var redis = require("redis");
var redisHelp = require('./redisHelp');
require('dotenv').config();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const redisUrl = process.env.REDIS_URL;
const mongoDBUri = process.env.MONGODB_URI;
const secret = process.env.TOKEN_SECRET;
const port = process.env.PORT || 5000;

var Room = require('./models/room.js');
var User = require('./models/user.js');
var Message = require('./models/message.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

var sub = redis.createClient(redisUrl);
sub.on("error", function (err) {
  console.log("Error " + err);
});
sub.psubscribe('*_users');
sub.psubscribe('*_typing');

mongoose.connect(mongoDBUri)
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error(err));

http.listen(port, '0.0.0.0', function () {
  console.log('Listening on port ' + port);
});

const NUM_AVATARS = 8;

app.head('/auth', verifyToken, function (req, res) {
  User.findById(req.userId, function (err, user) {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
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
        res.sendStatus(404);
      }
    })
    .catch((error) => console.error(error))
  } else {
    res.sendStatus(404);
  }  
})

app.head('/api/v1/rooms', function (req, res) {
  if (req.query.shortid) {
    Room.findOne({ shortid: req.query.shortid }, function (err, room) {
      if (room) {
        res.sendStatus(200);
      } else {
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

app.post('/api/v1/rooms/', verifyToken, function (req, res) {
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
  Message.create({ text: req.body.message, user: req.userId, room: req.params.id, quote: req.body.quote })
  .then((message) => {
    return Message.findById(message.id).populate('user').populate({ path: 'quote', populate: { path: 'user' } }).exec()
  })
  .then((message) => {
    io.to(req.params.id).emit('message', message);
    redisHelp.removeTyping(req.params.id, JSON.stringify(message.user));
    return res.sendStatus(200);
  })
  .catch((err) => {
    console.error(err);
    redisHelp.removeTyping(req.params.id, JSON.stringify(message.user));
    return res.sendStatus(500);
  })
})

app.get('/api/v1/rooms/:id/messages', verifyToken, function (req, res) {
  Message.find({ room: req.params.id }).populate('user').populate({ path: 'quote', populate: { path: 'user' } }).exec(function (err, messages) {
    if (err) return res.sendStatus(500);
    if (!messages) return res.sendStatus(404);
    res.status(200).send(messages)
  })
})

app.post('/api/v1/rooms/:id/typing', verifyToken, function (req, res) {
  User.findById(req.userId, function (err, user) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);
    redisHelp.addTyping(req.params.id, JSON.stringify(user));
    res.sendStatus(200);
  })
})

app.post('/login', function (req, res) {
  User.findOne({ name: req.body.name }, { password: 1 }, function (err, user) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);
    bcrypt.compare(req.body.password, user.password, function (err, isValid) {
      if (err) console.error(err);
      if (isValid) {
        var token = jwt.sign({ id: user._id }, secret, {
          expiresIn: 86400
        });
        user.password = undefined;
        res.status(200).send({ auth: true, token: token, user: user });
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

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

sub.on('pmessage', (pattern, channel, message) => {
  if (pattern === '*_users') {
    let room = channel.replace('_users', '');
    let users = JSON.parse(message).map((user) => JSON.parse(user));
    io.to(room).emit('current users', users)
  } else if (pattern === '*_typing') {
    let room = channel.replace('_typing', '');
    let users = JSON.parse(message).map((user) => JSON.parse(user));
    io.to(room).emit('typing', users)
  }
})

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    User.findById(socket.user)
    .then((user) => {
      if (!user) throw Error('Disconnect: user ' + socket.user + ' not found');
      redisHelp.removeUser(socket.room, JSON.stringify(user));
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
      User.findById(decoded.id)
      .then((user) => {
        if (!user) throw Error('Connect: user not found');
        socket.join(socket.room);
        socket.emit('set_user', decoded.id);
        redisHelp.addUser(socket.room, JSON.stringify(user));
      })
      .catch((err) => {
        console.error(err);
      })
    });
  });
});