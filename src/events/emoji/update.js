module.exports = {
  name: "emojiUpdate",
  async execute(oldEmoji, newEmoji) {
    console.log(
      `Emoji: **${oldEmoji.name}** has been updated to: **${newEmoji.name}**`
    );
  },
};
