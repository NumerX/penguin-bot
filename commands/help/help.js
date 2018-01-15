function call(message) {
 var channel = message.channel;
 channel.send("TEST")
}

module.exports = {
	command: (message) => call(message)
}