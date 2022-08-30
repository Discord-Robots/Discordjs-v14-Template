const wait = require("node:timers/promises").setTimeout;
const blockedGuids = require("../../models/blocked");

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
    await wait(3000);
    console.log(
      client.chalk.greenBright(
        `[CLIENT] - ${client.user.tag} has logged into Discord!`
      )
    );
    let db = await blockedGuids.findOne({ client_id: client.user.id });
    if (!db) {
      new blockedGuids({
        client_id: client.user.id,
        guilds: [],
      })
        .save()
        .catch(console.error());
    } else return;
    setInterval(client.pickPresence, 8000);
  },
};
