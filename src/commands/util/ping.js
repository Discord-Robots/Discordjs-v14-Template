const {
  Client,
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder
} = require("discord.js");
const ms = require("ms");

module.exports = {
  developer: true,
  category: "util",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns my ping."),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @returns
   */
  async execute(interaction, client) {
    const msg = await interaction.deferReply({
      fetchReply: true,
    });
    const embed = new EmbedBuilder({
      title: `Bot and API Latency`,
      description: `Here you can see the Bot's and the API latency.`,
      color: client.color,
      fields: [
        {
          name: `Bot Latency`,
          value: `${ms(msg.createdTimestamp - interaction.createdTimestamp, {
            long: true,
          })}`,
          inline: true,
        },
        {
          name: `API Latency`,
          value: `${ms(client.ws.ping, { long: true })}`,
          inline: true,
        },
      ],
    });

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
