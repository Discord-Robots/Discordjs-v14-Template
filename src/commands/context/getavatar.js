const {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  EmbedBuilder,
  Client,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  category: "context",
  data: new ContextMenuCommandBuilder()
    .setName("getavatar")
    .setType(ApplicationCommandType.User),

  /**
   *
   * @param {ContextMenuCommandBuilder} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const avatarEmbed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.targetUser.username}'s avatar!` })
      .setImage(`${interaction.targetUser.displayAvatarURL({ size: 1024 })}`);
    await interaction.reply({ embeds: [avatarEmbed] });
  },
};
