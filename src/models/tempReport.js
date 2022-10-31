const { Schema, model } = require("mongoose");

const tempReport = new Schema({
    messageId: { type: String },
    messageLink: { type: String },
    guild: {
        guildId: { type: String },
        channelId: { type: String },
        msgUserId: { type: String },
        msgUserTag: { type: String },
        reporterId: { type: String },
    },
});

module.exports = model("TempReport", tempReport, "tempReports");
