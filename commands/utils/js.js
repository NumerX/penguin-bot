function call (message) {
    message.delete();
    var code = message.content.replace(".js ", "");
    message.channel.send("\`\`\`js\n" + code + "\n\`\`\`");
}

module.exports = {
    command: (message) => call(message)
}