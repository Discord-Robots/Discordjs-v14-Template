module.exports = {
  name: "emojiDelete",
  async execute(emoji) {
    console.log(`Emoji: **${emoji.id}** has been updated.`);
  },
};
