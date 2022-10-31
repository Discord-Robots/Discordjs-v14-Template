module.exports = {
  name: "appeal",
  cooldown: 10,
  enabled: true,
  aliases: [],
  description: "Gives guild owner ability to appeal a block.",
  async execute(message, args, client) {
    message.reply("appeal command works");
  },
};
