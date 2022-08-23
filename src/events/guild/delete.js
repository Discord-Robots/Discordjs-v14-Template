module.exports = {
  name: "guildDelete",
  async execute(guild) {
    console.log(`I've been kicked from guild: ${guild.name}`);
  },
};
