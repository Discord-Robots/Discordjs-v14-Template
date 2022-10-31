const {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  category: "context",
  data: new ContextMenuCommandBuilder()
    .setName("Avatar")
    .setDMPermission(false)
    .setType(ApplicationCommandType.User),

  /**
   *
   * @param {import("discord.js").ContextMenuCommandInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    const user = interaction.targetUser;
    const id = user.id;
    const avatar = user.avatar;
    const buttons = [
      button("png", id, avatar),
      button("jpg", id, avatar),
      button("webp", id, avatar),
    ];

    if (avatar.startsWith("a_")) {
      buttons.push(button("gif", id, avatar));
    }

    const row = new ActionRowBuilder();
    buttons.forEach((button) => {
      row.addComponents(button);
    });

    const avatarEmbed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.targetUser.username}'s avatar!` })
      .setImage(`${interaction.targetUser.displayAvatarURL({ size: 1024 })}`);

    await interaction.reply({
      embeds: [avatarEmbed],
      components: [row],
      ephemeral: true,
    });
  },
};
function button(type, user, avatar) {
  return new ButtonBuilder({
    label: type,
    style: ButtonStyle.Link,
    url: `https://cdn.discordapp.com/avatars/${user}/${avatar}.${type}?size=1024`,
    type: 2,
  });
}
