module.exports = {
  name: "emojiUpdate",
  /**
   *
   * @param {import("discord.js").Emoji} oldEmoji
   * @param {import("discord.js").Emoji} newEmoji
   * @param {import("../../Structures/bot")} client
   */
  async execute(oldEmoji, newEmoji, client) {
    console.log(
      `Emoji: **${oldEmoji.name}** has been updated to: **${newEmoji.name}**`
    );
  },
};
