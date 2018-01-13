const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

/*
 * TODO: Code goes here
 */

bot.login(config.token);
