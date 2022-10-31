const { Emoji } = require("discord.js");

module.exports = {
  name: "emojiUpdate",
  /**
   *
   * @param {Emoji} oldEmoji
   * @param {Emoji} newEmoji
   * @param {import("../../Structures/bot")} client
   */
  async execute(oldEmoji, newEmoji, client) {
    console.log(
      `Emoji: **${oldEmoji.name}** has been updated to: **${newEmoji.name}**`
    );
  },
};
