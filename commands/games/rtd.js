function call (message) {
  var random = Math.floor(Math.random() * 6) + 1;
  message.channel.send("You rolled a " + random + "! " + message.author.toString());
}

module.exports = {
  command: (message) => {
    call(message);
  }
}
