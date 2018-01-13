
function call (message, bot, args) {
  const reportChannel = bot.channels.get('341895576872419329');
  if (reportChannel == null) return;
  let mentioned = message.mentions.members.first();
  if (mentioned == null) {
    message.channel.send("Please mention the player that you're reporting using the @ sign.");
    return;
  }
  message.author.send("You have successfully reported " + mentioned.toString() + "!");
  message.author.send("**NOTE:** Abuse of this command is punishable!");
  args.shift();
  args.shift();
  var reason = args.join(" ")
  reportChannel.send(message.author.toString() + " reported " + mentioned.toString() + " for: " + reason);
}

module.exports = {
  command: (message, bot, args) => call(message, bot, args)
}
