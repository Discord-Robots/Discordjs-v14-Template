module.exports = {
  name: "appeal",
  cooldown: 10,
  enabled: true,
  aliases: [],
  description: "Gives guild owner ability to appeal a block.",
  /**
   *
   * @param {import("discord.js").Message} message
   * @param {string} args
   * @param {import("../../Structures/bot")} client
   */
  async execute(message, args, client) {
    message.reply("appeal command works");
  },
};
