const {
  EmbedBuilder,
  Client,
  SlashCommandBuilder,
  CommandInteraction,
  InteractionType,
} = require("discord.js");

module.exports = {
  category: "util",
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Gets a users avatar!")
    .addUserOption((user) =>
      user.setName("target").setDescription("Select a user!")
    ),

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const targetUser =
      interaction.options.getUser("target") || interaction.user;

    const avatarEmbed = new EmbedBuilder()
      .setAuthor({ name: `${targetUser.username}'s avatar!` })
      .setImage(`${targetUser.displayAvatarURL({ size: 1024 })}`);
    await interaction.reply({
      embeds: [avatarEmbed],
    });
  },
};
