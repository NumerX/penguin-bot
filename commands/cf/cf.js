var main = require('./startup.js');

function call(message) {
	var messageContent = message.content.split(" ");
	var arg = messageContent[1];
	if (arg == null) {
		message.channel.send("Too few arguments!");
		return;
	}
	if (arg.toLowerCase() == "new") {
		var playerName = message.author.toString();
		if (main.queue.indexOf(playerName) != -1) {
			message.channel.send("Already in queue!");
			return;
		} else {
			main.queue.push(playerName);
			message.channel.send("Successfully joined queue.");
			return;
		}
	} else if (arg.toLowerCase() == "echo") {
		if (main.queue.length == 0) {
			message.channel.send("Queue is empty! Join the queue with `.cf new`!");
			return;
		}
			message.channel.send("There are " + main.queue.length + " people in queue: " + main.queue.join(", "))
			return;
	} else if (arg.toLowerCase() == "bot") {
		var random = Math.floor(Math.random() * 2) + 1;
		if (random == 1) {
			message.channel.send("You won! " + message.author.toString());
			return;
		} else if (random == 2) {
			message.channel.send("Better luck next time! I won! " + message.author.toString());
			return;
		}
	} else if (arg.toLowerCase() == "clear") {
		main.queue = [];
		message.channel.send("The queue has been cleared, as per request. " + message.author.toString())
	} else {

		let mentioned = message.mentions.members.first();
		if (mentioned == null) {
			message.channel.send("Incorrect arguments!");
			return;
		}
		if (main.queue.indexOf(mentioned.user.toString()) != -1) {
			var random = Math.floor(Math.random() * 2) + 1;
			if (random == 1) {
				message.channel.send(mentioned.toString() + " won the coinflip!");
				main.queue = main.queue.filter(function(s) {
				   return s !== mentioned.user.toString();
				});
				return;
			}
			if (random == 2) {
				message.channel.send(message.author.toString() + " won the coinflip!");
				main.queue = main.queue.filter(function(s) {
				   return s !== mentioned.user.toString();
				});
				return;
			}

		} else {
			message.channel.send("That person is not in queue!");
			return;
		}
	}

}

module.exports = {
	command: (message) => call(message)
}