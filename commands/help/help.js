function call(message) {
 var channel = message.channel;
message.author.sendMessage("Help panel BETA \n Admin commands:\n.call Call an admin\n Utilites\n.rtd Random number beetween 1-6. ")
}

module.exports = {
	command: (message) => call(message)
}