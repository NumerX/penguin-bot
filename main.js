// declare main constants
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const YTDL = require('ytdl-core');
const antiSwear = require('./functions/antiswear.js')

/* functions */
const utils = require('./functions/utils.js');
const personality = require('./functions/personality');
const join = require('./functions/join');
const commands = require ('./commandManager');

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
    bot.user.setGame("");
  });
}

// join event
bot.on("guildMemberAdd", (member) => {
  join.join(member);
});

/* STARTUP EVENT */
bot.on("ready", function() {
  utils.printSuccess("Penguin is online and stable on all clients.");
  bot.user.setGame("");
})

    /* PERSONALITY */
    bot.on("message", function (message) {
      antiSwear.antiswear(message);
      personality.greet(message);
      personality.penguin(message);
    });

bot.on("message", function(message) {
  // if the sender was the bot, return
  if (message.author.equals(bot.user)) return;
  if (!message.content.startsWith(config.prefix)) return;
  if (message.mentions.members == null) return;
  if (message.author.id.toString() =="328595573168930817") { //Barna
    message.channel.send("You have been BOT-Banned by a moderator. If you think this is an error, please contact an administrator. " + message.author.toString());
    return;
  }
  let mentioned = message.mentions.members.first();

  var args = message.content.substring(config.prefix.length).split(" ");

  switch(args[0]) {
  /* UTILS */
    case "ip":
      commands.ip(message);
      break;
    case "website":
      commands.website(message);
      break;
    case "report":
      commands.report(message, bot, args);
      break;
    case "call":
      commands.call(message, bot);
      break;
    case "js":
      commands.js(message);
      break;
  /* ADMIN */
    case "accept":
      commands.accept(message, bot);
      break;
    case "dev":
      commands.dev(message);
      break;
  /* GAMES */
    case "rtd":
      commands.rtd(message);
      break;
    case "cf":
      commands.cf(message);
      break;
  // Hypixel
    case "hypixel":
      commands.hypixel(message);
      break;
  /* MUSIC */
  case "play":
    if (!args[1]) {
      message.channel.send("Please provide a link to a youtube video!");
      return;
    }

    if (!message.member.voiceChannel) {
      if (mentioned == null) {
      message.channel.send("You must be in a voice channel to play music!");
      return;
    } else {
      // if the mentioned player isn't in a channel either, stop
      if (!mentioned.voiceChannel) {
        message.channel.send("That user is not in a voice channel!");
        return;
      }
      // adds compaitibility to Teemie, the bot.
      if(!servers[message.guild.id]) servers[message.guild.id] = {
      queue: []
    };

    var server = servers[message.guild.id];

    server.queue.push(args[1]);
      mentioned.voiceChannel.join().then(function(connection) {
        play(message, connection);
      });
      return;
    }
  }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
      queue: []
    };

    var server = servers[message.guild.id];

    server.queue.push(args[1]);

    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
      play(message, connection);
    })
    break;
    case "stop":
      var server = servers[message.guild.id];

      if (message.guild.voiceConnection)
      {
          for (var i = server.queue.length - 1; i >= 0; i--)
          {
              server.queue.splice(i, 1);
       }
          server.dispatcher.end();
          utils.printLog("The queue has been stopped!");
          bot.user.setGame("");
      }
          break;
      case "skip":
        var server = servers[message.guild.id];
        if (server.dispatcher) server.dispatcher.end();
        break;

    default:
      message.channel.send("Command not found!");
  }
})

// login using the token declared in config.json
bot.login(config.token);
