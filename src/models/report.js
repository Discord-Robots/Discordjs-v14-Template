import { Schema, model } from "mongoose";

export default model(
  "Report",
  new Schema({
    guild: {
      guildId: { type: String },
      logsChannelId: { type: String },
      reports: [
        {
          messageId: { type: String },
          userId: { type: String },
          reporterId: { type: String },
          channelId: { type: String },
        },
      ],
    },
  }),
  "Report"
);
