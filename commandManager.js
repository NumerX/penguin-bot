// get all of the command classes

/* UTILS */
  const ip = require('./commands/utils/ip.js');
  const website = require('./commands/utils/website.js');
  const report = require('./commands/utils/report.js');
  const call = require('./commands/utils/call.js');
  const js = require('./commands/utils/js.js');
  const help = require('./commands/help/help.js');
/* ADMIN */
  const accept = require('./commands/admin/accept.js');
  const dev = require('./commands/admin/dev.js');
/* GAMES */
  const rtd = require('./commands/games/rtd.js');
  const cf = require('./commands/cf/cf.js');
  // Hypixel
  const hypixel = require('./commands/hypixel/hypixel.js');
/* MUSIC */
  const yt = require('./commands/youtube/yt.js');


module.exports = {
  // UTILS:
  ip: (message) => ip.command(message),
  website: (message) => website.command(message),
  report: (message, bot, args) => report.command(message, bot, args),
  call: (message, bot) => call.command(message, bot),
  js: (message) => js.command(message),
  help: (message) => help.command(message),

  // ADMIN
  accept: (message, bot) => accept.command(message, bot),
  dev: (message) => dev.command(message),

  // GAMES:
  rtd: (message) => rtd.command(message),
  cf: (message) => cf.command(message),

  // HYPIXEL
  hypixel: (message) => hypixel.command(message),

  // MUSIC:
  play: (message, args) => yt.play(message, args),
  stop: (message, bot) => yt.stop(message),
  skip: (message) => yt.skip(message)
}
