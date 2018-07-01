var redis = require("redis");
var promise = require("bluebird");

const redisUri = process.env.REDIS_URI;

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
    }
}
