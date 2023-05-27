const { Connect } = process.env;
const blockedGuids = require("../../models/blocked");

module.exports = {
    name: "ready",
    /**
     *
     * @param {import("../../Structures/bot")} client
     */
    async execute(client) {
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
            client.pickPresence();
        }
    },
};
