const { EmbedBuilder, GuildMember, Client } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  /**
   * 
   * @param {GuildMember} member 
   * @param {Client} client 
   */
  async execute(member, client) {
    const message = `${member.user.username} left server: ${member.guild.name}`;
    const memCount = member.guild.members.cache.filter((m) => m.user.bot === false).size
    const goodbyeChannel = member.guild.channels.cache.find((ch) =>
      ch.name.includes("leave")
    );


    const embed = new EmbedBuilder({
      author: {
        name: `${member.user.tag}`,
      },
      description: message,
      title: `Member Count: ${memCount}`,
      thumbnail: {
        url: `${member.user.displayAvatarURL({ dynamic: true })}`
      },
      footer: {
        text: `${client.user.username}`,
      },
    }).setTimestamp()

    goodbyeChannel.send({ embeds: [embed] });
  },
};
