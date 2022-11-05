const {
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  category: "util",
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Gets a users avatar!")
    .setDMPermission(false)
    .addUserOption((user) =>
      user.setName("target").setDescription("Select a user!")
    ),

  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    const targetUser =
      interaction.options.getUser("target") || interaction.user;
    const id = targetUser.id;
    const avatar = targetUser.avatar;
    const animated = avatar.startsWith("a_");
    const pfp = targetUser.avatarURL({ dynamic: true });
    const member = await interaction.guild.members.fetch(id);
    let op = member.nickname ? member.nickname : targetUser.username;

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
      .setImage(`${targetUser.displayAvatarURL({ size: 1024 })}`);

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
