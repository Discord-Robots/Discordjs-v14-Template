const { Schema, model } = require("mongoose");

const Guild = new Schema({
    guildID: String,
    guildName: String,
    guildOwner: String,
    guildOwnerID: String,
    modLogsChannelID: String,
    prefix: { type: String, default: process.env.Prefix },
    botSpamChannel: String,
    botCommandsChannel: String
});

module.exports = model("Guild", Guild, "Guild");
