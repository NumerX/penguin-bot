const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');


function onSwear(message) {
    if (message.guild == null) return;
    if (message.author.equals(bot.user)) return;
    var content = message.content.toLowerCase();
    let warned = message.guild.roles.find("name", "Warned");
    if(content.indexOf("fuck") != -1 || content.indexOf("cunt") != -1 || content.indexOf("dick") != -1) {
        if (message.member.roles.has(warned.id)) {
        message.delete();
        message.member.kick("You have been kicked from the server!");
        } else {
            message.delete();
            message.member.addRole(warned).catch(console.error);
        }
    } else return;
}

module.exports = {
    antiswear: (message) => onSwear(message)
}


bot.login(config.token);