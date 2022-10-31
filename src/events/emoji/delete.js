module.exports = {
  name: "emojiDelete",
  /**
   *
   * @param {import("discord.js").Emoji} emoji
   * @param {import("../../Structures/bot")} client
   */
  async execute(emoji, client) {
    console.log(`Emoji: **${emoji.id}** has been updated.`);
  },
};
