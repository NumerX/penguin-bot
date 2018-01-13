const config = require("./config.json");
const api = config.api;
const request = require("request");
const functions = require("./functions.js");

function call(message) {
	var messageContent = message.content.split(" ");
	var playerName = messageContent[1];
	if (playerName == null) {
		message.channel.send("Please enter a player name!");
		return;
	}
	var url = "https://api.hypixel.net/player?key=" + api + "&name=" + playerName;
	request({
		url: url,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			/* Null checks and such*/
			if(body.player == null) {
				message.channel.send("Player doesn't exist! (Returned null!)");
				return;
			}
			if(body.success != true) {
				message.channel.send("An unexpected error occured! (Success returned false)");
				return;
			}
			if(body.player == "null") {
				message.channel.send("Player doesn't exist! (Returned null!)");
				return;
			}
			/* ACTUAL CODE BEGINS HERE! */
			var sender = message.author;
			var channel = message.channel;
			/* Player Level */
			var networkExp = body.player.networkExp;
			var networkLevel = body.player.networkLevel;
			networkExp += functions.getTotalExpToLevel(networkLevel + 1);
			var level = functions.getLevel(networkExp);

			/* Last login / logout */
			var lastLoginUnix = body.player.lastLogin;
			var lastLoginDate = functions.dateFromUnix(lastLoginUnix);
			var lastLogoutUnix = body.player.lastLogout;
			var lastLogoutDate = functions.dateFromUnix(lastLogoutUnix);

			/* Extra things */
			var playerKarma = body.player.karma;
			var name = body.player.displayname;

			/* Skywars */

			// solo
			if (body.player.achievements != undefined || body.player.achievements != null) {
			var soloWins = body.player.achievements.skywars_wins_solo;
			var soloKills = body.player.achievements.skywars_kills_solo;
		}
			sender.send("Username: " + name);
			sender.send("Hypixel network level: " + level + "\nLast Login: " + lastLoginDate + "\nLast Logout:" + lastLogoutDate);
			sender.send("Karma: " + playerKarma);
			if (body.player.achievements != undefined || body.player.achievements != null)
			sender.send("Skywars:\nSolo kills: " + soloKills + "\nSolo wins: " + soloWins);
			channel.send("Sent you a DM with information! " + sender.toString());


		} else {
			message.channel.send("An unexpected error occured!");
		}
	})
} 

module.exports = {
	command: (message) => call(message)
}