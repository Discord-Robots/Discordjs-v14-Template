const { Schema, model } = require("mongoose");

const Report = new Schema({
  guild: {
    guildId: { type: String },
    logsChannelId: { type: String },
    reports: [{
      messageId: { type: String },
      userId: { type: String },
      reporterId: { type: String },
      channelId: { type: String },
    }]

  },

});

module.exports = model("Report", Report, "Report");
