function call (message) {

  message.channel.send("The IP address has not been released just yet! " + message.author.toString())

}

module.exports = {

  command: (message) => {
    call(message);
  }

}
