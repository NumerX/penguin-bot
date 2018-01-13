const dev = require('../../dev.js');

function call (message) {
    var pass = message.content.replace(".dev ", "");
    var prefix= "[DEV] ";
    if (pass == "ICEDEV") {
        if (!dev.dev) {
        message.delete();
        message.channel.send("Now running developer build ICE.");
        dev.dev = true;
        console.log(prefix + message.author.username + " Attempted DEV build with password: " + pass + " Success: " + dev.dev);
        return;
    } else {
        message.delete();
        message.channel.send("Developer build has been disabled.");
        dev.dev = false;
        console.log(prefix + message.author.username + " Attempted DEV build with password: " + pass + " Success: " + dev.dev);
        return;
    }
    } else {
        message.delete();
        message.author.send("Incorrect password! Spamming this command will result in a ban!");
        console.log(prefix + message.author.username + " Attempted DEV build with password: " + pass + " Success: " + dev.dev);
        return;
    }
}

module.exports = {
    command: (message) => call(message)
}