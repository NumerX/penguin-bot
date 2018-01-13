function call (message, bot) {
  const callChannel = bot.channels.get('343504517603786754');
  if (callChannel == null) return;
  callChannel.send(message.author.toString() + " has requested assistance! Accept his call with .accept!");
  message.author.send("You have successfully called an admin! \nIf we don't get back to you within 24 hours, please call again!");
}

module.exports = {
  command: (message, bot) => call(message, bot)
}
