const { Schema, model } = require("mongoose");

const msgReport = new Schema({
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

module.exports = model("msgReport", msgReport, "msgReports");
