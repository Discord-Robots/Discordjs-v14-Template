const { Message, Client, Collection } = require("discord.js");
const { Prefix, Connect } = process.env;
const db = require("../../models/status");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   * @param {Client} client
   *
   */
  async execute(message, client) {
    if (message.author.bot) return;

    if (Connect) {
      let doc = await db.findOne({ client_id: client.user.id });
      if (doc.status === "offline") return;
    }

    let msg = message.content.toLowerCase();

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>)\\s*`);
    let str = "";
    if (!Prefix) {
      if (prefixRegex.test(message.content)) {
        str += `I do not support legacy commands due to Discord limitations.`;
        return message.reply(str);
      }
    } else {
      if (prefixRegex.test(message.content)) {
        str += `My prefix is \`${Prefix}\` in this server.`;
        return message.reply(str);
      }

      const args = message.content.substring(Prefix.length).split(/ +/);

      const command = legacyCommands.find(
        (cmd) => cmd.name === args[0] || cmd.aliases.includes(args[0])
      );

      if (!Connect && command.dbRequired) {
        return await interaction.reply({
          content: `This command is unavailable due to having no database setup.`,
          ephemeral: true,
        });
      }

      if (!command) return null;

      if (command.ownerOnly && utils.checkOwner(message.author.id)) {
        str += "Sorry, this command can only be used by the bot owner.";
        return utils.errorEmbed(str, message.channel);
      }

      if (!command.enabled) {
        str +=
          "This command is currently disabled. Please wait for bot developer to fix this command. Thank you!";
        return utils.errorEmbed(str, message.channel);
      }
      if (!cooldowns.legacyCommands.has(command.name)) {
        cooldowns.legacyCommands.set(command.name, new Collection());
      }
      const now = Date.now();
      const timestamps = cooldowns.legacyCommands.get(command.name);
      const cooldownAmount = (command.cooldown || 5) * 1000;

      if (timestamps.has(message.author.id)) {
        if (utils.checkOwner(message.author.id))
          command.execute(message, args, client);
        else {
          const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            str += `please wait ${timeLeft.toFixed(
              1
            )} more second(s) before reusing the \`${command.name}\` command.`;
            return utils.errorEmbed(str, message.channel);
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
      if (command && !message.inGuild()) {
        if (command && msg.startsWith(Prefix)) {
          try {
            command.execute(message, args, client);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  },
};
