var jwt = require('jsonwebtoken');
require('dotenv').config();
var secret = process.env.TOKEN_SECRET;

function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, secret, function (err, decoded) {
        if (err) return res.sendStatus(500);
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;