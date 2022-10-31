const { Emoji } = require("discord.js");

module.exports = {
  name: "emojiCreate",
  /**
   *
   * @param {Emoji} emoji
   * @param {import("../../Structures/bot")} client
   */
  async execute(emoji, client) {
    console.log(emoji);
  },
};
