const {
  Client,
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns my ping."),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @returns
   */
  async execute(client, interaction) {
    const msg = await interaction.deferReply({
      fetchReply: true,
    });
    const embed = new EmbedBuilder()
      .setTitle(`Bot and API Latency`)
      .setDescription(`Here you can see the Bot's and the API latency.`)
      .setColor(0x22b14c)
      .addFields([
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
      ]);

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
