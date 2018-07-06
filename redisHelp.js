var redis = require("redis");
var promise = require("bluebird");

const redisUri = process.env.REDIS_URI;

// Remove members from typing list after 5 seconds
const TYPING_EXPIRE = 5000;

promise.promisifyAll(redis.RedisClient.prototype);
promise.promisifyAll(redis.Multi.prototype);

var pub = redis.createClient(redisUri);
pub.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = {
    addUser: function (room, user) {
        pub.multi().sadd(room + '_users', user).smembers(room + '_users')
        .execAsync()
        .then((res) => pub.publish(room + '_users', JSON.stringify(res[res.length-1])))
    },
    
    removeUser: function (room, user) {
        pub.multi().srem(room + '_users', user).smembers(room + '_users')
        .execAsync()
        .then((res) => pub.publish(room + '_users', JSON.stringify(res[res.length - 1])))
    },

    addTyping: function (room, user) {
        pub.multi().zadd(room + '_typing', Date.now(), user).zrange(room + '_typing', 0, -1)
        .execAsync()
        .then((res) => {
            pub.publish(room + '_typing', JSON.stringify(res[res.length - 1]));
            setTimeout(() => this.removeTyping(room), TYPING_EXPIRE)
        })
        .catch((error) => console.error(error))
    },

    removeTyping: function (room) {
        pub.multi().zremrangebyscore(room + '_typing', '-inf', Date.now() - TYPING_EXPIRE).zrange(room + '_typing', 0, -1)
        .execAsync()
        .then((res) => pub.publish(room + '_typing', JSON.stringify(res[res.length - 1])))
        .catch((error) => console.error(error))
    }
}
