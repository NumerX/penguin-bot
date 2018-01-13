const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../../config.json');
const YTDL = require('ytdl-core')

var servers = {};
function play(connection, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream();
}
function play(message, connection) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
  YTDL.getInfo(server.queue[0], function (err, info) {
    bot.user.setGame(info.title);
  });
  server.queue.shift();
  server.dispatcher.on("end", function() {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
    bot.user.setGame("nothing");
  });
}

// play
function playCommand(message, args) {
if (!args[1]) {
  message.channel.send("Please provide a link to a youtube video!");
  return;
}

if (!message.member.voiceChannel) {
  message.channel.send("You must be in a voice channel to play music!");
}

if(!servers[message.guild.id]) servers[message.guild.id] = {
  queue: []
};

var server = servers[message.guild.id];

server.queue.push(args[1]);

if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
  play(message, connection);
})}

// skip
function skipCommand(message) {
var server = servers[message.guild.id];
if (server.dispatcher) server.dispatcher.end();
}

// stop
function stopCommand(message) {
  var server = servers[message.guild.id];

  if (message.guild.voiceConnection)
  {
      for (var i = server.queue.length - 1; i >= 0; i--)
      {
          server.queue.splice(i, 1);
   }
      server.dispatcher.end();
      functions.printLog("The queue has been stopped!");
      bot.user.setGame("");
  }﻿
}

module.exports = {
  skip: (message) => skipCommand(message),
  play: (message, args) => playCommand(message, args),
  stop: (message) => stopCommand(message)
}


bot.login(config.token);
