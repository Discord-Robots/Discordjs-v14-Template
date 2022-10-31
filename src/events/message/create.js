const { Prefix, BotOwnerID } = process.env;

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {import("discord.js").Message} message
   * @param {import("../../Structures/bot")} client
   *
   */
  async execute(message, client) {
    const { legacyCommands } = client;
    if (message.author.bot) return;
    let msg = message.content.toLowerCase();

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>)\\s*`);
    let str = "";
    if (!Prefix) {
      if (prefixRegex.test(message.content)) {
        str += `I do not support legacy commands due to Discord limitations. Please check out my slash (/) commands!`;
        return message.reply(str);
      }
    } else {
      if (message.author.id !== BotOwnerID) return null;

      const args = message.content.substring(Prefix.length).split(/ +/);

      const command = legacyCommands.find(
        (cmd) => cmd.name === args[0] || cmd.aliases.includes(args[0])
      );

      if (!command) return null;

      if (command && msg.startsWith(Prefix)) {
        try {
          command.execute(message, args, client);
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
};
