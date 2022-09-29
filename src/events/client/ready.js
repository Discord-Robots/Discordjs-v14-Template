const { Connect } = process.env;
const blockedGuids = require("../../models/blocked");
const presence = require("../../models/status");

module.exports = {
  name: "ready",
  /**
   *
   * @param {import('discord.js').Client} client
   */
  async execute(client) {
    await utils.wait(3000);
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
      let doc = await presence.findOne({ client_id: client.user.id });
      if (!doc) {
        new presence({
          client_id: client.user.id,
          status: "online",
        })
          .save()
          .catch(console.error());
      }
      await utils.wait(5000);
      if (doc.status === "offline")
        await presence
          .updateOne({ status: "online" })
          .then(client.pickPresence());
      if (doc.status === "online") client.pickPresence();
    }
  },
};
