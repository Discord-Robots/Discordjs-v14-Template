const { Message, Client } = require("discord.js");
const { DevGuild, Prefix, Connect } = process.env;
const db = require("../../models/status");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @returns
   */
  async execute(message, client) {
    if (Connect) {
      let doc = await db.findOne({ client_id: client.user.id });
      if (doc.status === "offline") return;
    }
    if (
      message.author.bot ||
      message.system ||
      message.channel.type === "dm" ||
      !message.guild
    )
      return null;

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>)\\s*`);

    let str = "";
    if (prefixRegex.test(message.content)) {
      str += `I do not support legacy commands due to Discord limitations.`;
      return message.reply(str);
    }

  },
};
