const { Collection } = require("discord.js");


module.exports = {
  name: "messageCreate",
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
    if (prefixRegex.test(message.content))
      return message.reply(`I do not support legacy commands due to Discord limitations.`);
  },
};
