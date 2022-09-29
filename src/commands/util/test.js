const {
  Client,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  developer: true,
  category: "util",
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Returns an embed."),
  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  async execute(interaction, client) {
    const embeds = [
      new EmbedBuilder({
        title: "Test 1",
        description: "Description 1",
        footer: {
          text: "This is a cool embed paginator!",
        },
      }),
      new EmbedBuilder({
        title: "Test 2",
        description: "Description 2",
        footer: {
          text: "This is a cool embed paginator!",
        },
      }),
      new EmbedBuilder({
        title: "Test 3",
        description: "Description 3",
        footer: {
          text: "This is a cool embed paginator!",
        },
      }),
      new EmbedBuilder({
        title: "Test 4",
        description: "Description 4",
        footer: {
          text: "This is a cool embed paginator!",
        },
      }),
      new EmbedBuilder({
        title: "Test 5",
        description: "Description 5",
        footer: {
          text: "This is a cool embed paginator!",
        },
      }),
    ];
    await client.embedPages(interaction, embeds);
  },
};
