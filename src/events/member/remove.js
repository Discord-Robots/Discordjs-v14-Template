const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  /**
   *
   * @param {import("discord.js").GuildMember} member
   * @param {import("../../Structures/bot")} client
   */
  async execute(member, client) {
    if (member.user.bot) return;
    const auditLogs = await member.guild.fetchAuditLogs({
      user: member.id,
      limit: 1,
    });

    const memCount = member.guild.members.cache.filter(
      (m) => m.user.bot === false
    ).size;
    const botCount = member.guild.members.cache.filter(
      (m) => m.user.bot === true
    ).size;
    const totalCount = member.guild.memberCount;

    const message =
      `${member.user.username} left the server!\n\n` +
      `Member Counts: \n` +
      `Users: ${memCount}\n` +
      `Bots: ${botCount}\n` +
      `Total: ${totalCount}\n`;

    const goodbyeChannel = member.guild.systemChannel;

    const embed = new EmbedBuilder({
      author: {
        name: `${member.user.tag}`,
      },
      description: message,
      thumbnail: {
        url: `${member.user.displayAvatarURL({ dynamic: true })}`,
      },
      footer: {
        text: `${client.user.username}`,
      },
    }).setTimestamp();

    if (goodbyeChannel) goodbyeChannel.send({ embeds: [embed] });
  },
};
