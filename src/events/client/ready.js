const wait = require("node:timers/promises").setTimeout;

module.exports = {
  name: "ready",
  /**
   * 
   * @param {import('discord.js').Client} client 
   */
  async execute(client) {
    console.log(
      client.chalk.yellowBright(`[CLIENT] - Logging into Discord.....`)
    );
    await wait(3000)
    console.log(
      client.chalk.greenBright(`[CLIENT] - ${client.user.tag} has logged into Discord!`)
    );
    setInterval(client.pickPresence, 8000);
  }
};