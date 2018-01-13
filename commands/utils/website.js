function call (message) {
  message.channel.send("Our website's current address is `numerx.me`!");
}

module.exports = {
  command: (message) => call(message)
}
