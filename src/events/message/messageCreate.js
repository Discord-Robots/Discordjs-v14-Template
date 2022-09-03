const { Collection, Message, Client } = require("discord.js");
const { Prefix } = process.env;

module.exports = {
  // name: "messageCreate",
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @returns
   */
  async execute(message, client) {
    const { cooldowns, legacyCommands, aliases } = client;
    let msg = message.content.toLowerCase();
    if (
      message.author.bot ||
      message.system ||
      message.channel.type === "dm" ||
      !message.guild
    )
      return null;

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>)\\s*`);
    if (prefixRegex.test(message.content))
      return message.reply(`My prefix is \`${Prefix}\` in this server.`);
    const args = message.content.substring(Prefix.length).split(/ +/);

    const command = legacyCommands.find(
      (cmd) => cmd.name === args[0] || cmd.aliases.includes(args[0])
    );

    if (!command) return null;

    if (command.ownerOnly && client.utils.checkOwner(message.author.id)) {
      return client.utils.errorEmbed(
        "Sorry, this command can only be used by the bot owner.",
        message.channel
      );
    }

    if (!command.enabled) {
      return client.utils.errorEmbed(
        "This command is currently disabled. Please wait for bot developer to fix this command. Thank you!",
        message.channel
      );
    }
    if (!cooldowns.legacyCommands.has(command.name)) {
      cooldowns.legacyCommands.set(command.name, new Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.legacyCommands.get(command.name);
    const cooldownAmount = (command.cooldown || 5) * 1000;

    if (timestamps.has(message.author.id)) {
      if (client.utils.checkOwner(message.author.id))
        command.execute(message, args, client);
      else {
        const expirationTime =
          timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return client.utils.errorEmbed(
            `please wait ${timeLeft.toFixed(
              1
            )} more second(s) before reusing the \`${command.name}\` command.`,
            message.channel
          );
        }
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (command && msg.startsWith(Prefix)) {
      try {
        command.execute(message, args, client);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
