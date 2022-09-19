const { Connect } = process.env;
const blockedGuids = require("../../models/blocked");

module.exports = {
  name: "ready",
  /**
   *
   * @param {import('discord.js').Client} client
   */
  async execute(client) {
    client.pickPresence();

    if (Connect) {
      let db = await blockedGuids.findOne({ client_id: client.user.id });
      if (!db) {
        new blockedGuids({
          client_id: client.user.id,
          guilds: [],
        })
          .save()
          .catch(console.error());
      }
    }
  },
};
