const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');

function greet(message) {
  if (message.author.equals(bot.user)) return;
  /* hello */
  if (message.content.toLowerCase() == "hi" || message.content.toLowerCase() == "hello") {
    message.channel.send("Howdy! " + message.author.toString());
  }
 /* bye */
 if (message.content.toLowerCase() == "bye" || message.content.toLowerCase() == "goodbye") {
   message.channel.send("Cya! " + message.author.toString());
 }};
 function penguin(message) {
   if (message.author.equals(bot.user)) return;
   var content = message.content.toLowerCase();
   if (content.indexOf("penguin") != -1) {
     var randomNumber = Math.floor(Math.random() * 4) + 1;
     if (randomNumber-0 == 1) message.channel.send("Did someone say Penguin? Oh wait, that's me!");
     if (randomNumber-0 == 2) message.channel.send("Penguin? Who's that? I don't know any penguins.");
     if (randomNumber-0 == 3) message.channel.send("Who called? I'm here...");
     if (randomNumber-0 == 4) message.channel.send("I am one of those, right? Penguin?");
   }
 }

module.exports = {

  greet: (message) => {
    greet(message);
  },
  penguin: (message) => {
    penguin(message);
  }

};

bot.login(config.token);
