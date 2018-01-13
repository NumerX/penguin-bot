function call (message, bot) {
 const callChannel = bot.channels.get('343504517603786754');

 if (callChannel == null) return;
 if (message.channel.id.toString() != '343504517603786754') return;

 let mentioned = message.mentions.members.first();
 if (mentioned == null) {
   message.channel.send("Please mention the player with @.");
   return;
 }
 if (mentioned.toString() == bot.user.toString()) {
   message.channel.send("I never called! All I do is waddle! `waddles away into the darkness...`");
   return;
 }

 message.channel.send("You have successfully accepted " + mentioned.toString() + "\'s call! Please get in contact with him in any way.");
 mentioned.send(message.author.toString()  + " has accepted your call! Please get in contact with him in any way.");

}

module.exports = {
  command: (message, bot) => call(message, bot)
}
