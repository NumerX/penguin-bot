const Discord = require('discord.js');
const bot     = new Discord.Client();
const config = require('../../config.json');
var cfQueue = [];
bot.on("ready", () => {
	console.log("[SUCCESS] Coinflip is stable.")
})

bot.login(config.token);

module.exports = {
	queue: cfQueue
}