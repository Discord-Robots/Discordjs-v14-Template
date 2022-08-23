module.exports = {
  name: "emojiCreate",
  async execute(emoji) {
    console.log(
      `Emoji: **${emoji.name}** has been created with id: **${emoji.id}**`
    );
  },
};
