module.exports = {
  name: "test",
  cooldown: 10,
  enabled: true,
  aliases: ["te"],
  description: "Checks to see if the bot is online.",
  async execute(message, args, client) {
    message.reply("Test command works");
  },
};
