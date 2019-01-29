const keys = require("./keys");
const redis = require("redis");

console.log("Working code running...");

const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

sub.on("error", function(err) {
	console.log("Something went wrong " + err);
});

sub.on("connect", function() {
	hello();
	console.log("Redis client connected");
});

function fib(index) {
	console.log("fib", index);
	if (index < 2) return 1;
	return fib(index - 1) + fib(index - 2);
}

sub.on("message", (channel, message) => {
	console.log("Message", message);
	redisClient.hse("values", message, fib(parseInt(message)));
});
sub.subscribe("insert");
