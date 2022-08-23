const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  async execute(member) {
    const count = member.guild.memberCount
    member.guild.channels.cache
      .find((ch) => ch.name.includes("leave"))
      .send({
        embeds: [
          new EmbedBuilder(
            {
              author: {
                name: member.user.username + " has left the server",
                iconURL: member.user.avatarURL({ dynamic: true })
              },
              description: ';',

            }
          )
        ]
      });
  },
};
