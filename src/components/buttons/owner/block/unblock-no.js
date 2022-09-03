module.exports = {
  data: {
    id: "unblock-no",
  },
  async execute(interaction, client) {
    return interaction.update({
      content: "I have cancelled this action!",
      components: [],
      embeds: [],
    });
  },
};
