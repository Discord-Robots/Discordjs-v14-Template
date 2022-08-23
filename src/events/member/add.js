module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {
    const message = `${member.user.username} joined server: ${member.guild.name}`;
    const welcomeChannel = member.guild.channels.cache.find((ch) =>
      ch.name.includes("welcome")
    );
    welcomeChannel.send(message);
  },
};
