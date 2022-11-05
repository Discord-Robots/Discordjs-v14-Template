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
    const member = await interaction.guild.members.fetch(user.id);
    const id = member.id;
    const pfp = member.user.avatarURL({ dynamic: true });
    const avatar = member.user.avatar;
    const animated = member.user.avatar.startsWith("a_");
    let op = member.nickname ? member.nickname : member.user.username;

    const buttons = [
      reverse(pfp),
      button("png", id, avatar),
      button("jpg", id, avatar),
      button("webp", id, avatar),
    ];

    if (animated) {
      buttons.push(button("gif", id, avatar));
    }

    const row = new ActionRowBuilder();
    buttons.forEach((button) => {
      row.addComponents(button);
    });

    const avatarEmbed = new EmbedBuilder()
      .setAuthor({ name: `${op}'s avatar!` })
      .setImage(
        `${member.user.displayAvatarURL({ dynamic: true, size: 4096 })}`
      );

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
function reverse(type) {
  return new ButtonBuilder({
    label: "Reverse Lookup",
    style: ButtonStyle.Link,
    url: `https://www.google.com/searchbyimage?&image_url=${type}`,
    type: 2,
  });
}
