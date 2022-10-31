const { Emoji } = require("discord.js");

module.exports = {
  name: "emojiDelete",
  /**
   *
   * @param {Emoji} emoji
   * @param {import("../../Structures/bot")} client
   */
  async execute(emoji, client) {
    console.log(`Emoji: **${emoji.id}** has been updated.`);
  },
};
