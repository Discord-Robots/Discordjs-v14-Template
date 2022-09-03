module.exports = {
  owner: true,
  name: "test",
  cooldown: 10,
  enabled: true,
  description: "Checks to see if the bot is online.",
  async execute(message, args, client) {
    message.reply("Test command works");
  },
};
