import { Schema, model } from "mongoose";

export default model(
  "msgReport",
  new Schema({
    messageId: { type: String },
    messageLink: { type: String },
    guild: {
      guildId: { type: String },
      channelId: { type: String },
      msgUserId: { type: String },
      msgUserTag: { type: String },
      reporterId: { type: String },
    },
  }),
  "msgReports"
);
