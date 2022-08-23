module.exports = {
  name: "guildCreate",
  async execute(guild) {
    console.log(`I joined a new guild: ${guild.name}`);
  },
};
