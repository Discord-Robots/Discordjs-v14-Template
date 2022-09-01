const { Collection, Message, Client } = require("discord.js");
const { DevGuild } = process.env;

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @returns
   */
  async execute(message, client) {
    let msg = message.content.toLowerCase();
    if (
      message.author.bot ||
      message.system ||
      message.channel.type === "dm" ||
      !message.guild
    )
      return null;

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>)\\s*`);

    let str = "";
    if (message.guild.id !== DevGuild) {
      str += "This is not my server. Please contact my developer.";
    }
    if (prefixRegex.test(message.content)) {
      str += `I do not support legacy commands due to Discord limitations.`;
    }
    return message.reply(str);
  },
};
