const { EmbedBuilder, GuildMember, Client } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  /**
   * 
   * @param {GuildMember} member 
   * @param {Client} client 
   */
  async execute(member, client) {
    if (member.user.bot) return;

    const memCount = member.guild.members.cache.filter((m) => m.user.bot === false).size;
    const botCount = member.guild.members.cache.filter((m) => m.user.bot === true).size;
    const totalCount = member.guild.memberCount;

    const message = `${member.user.username} joined the server!\n` +
      `Welcome to ${member.guild.name}\n\n` +
      `Member Counts: \n` +
      `Users: ${memCount}\n` +
      `Bots: ${botCount}\n` +
      `Total: ${totalCount}\n`

    const welcomeChannel = member.guild.channels.cache.find((ch) =>
      ch.name.includes("welcome")
    );


    const embed = new EmbedBuilder({
      author: {
        name: `${member.user.tag}`,
      },
      description: message,
      thumbnail: {
        url: `${member.user.displayAvatarURL({ dynamic: true })}`
      },
      footer: {
        text: `${client.user.username}`,
      },
    }).setTimestamp()

    welcomeChannel.send({ embeds: [embed] });
  },
};
