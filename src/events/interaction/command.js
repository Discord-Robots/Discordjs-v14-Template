const {
  Client,
  CommandInteraction,
  InteractionType,
  EmbedBuilder,
  Collection,
} = require("discord.js");
const { Connect } = process.env;

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { commands, cooldowns } = client;

    if (!interaction.inGuild()) {
      return interaction.reply({
        content: "I do not allow commands/ interactions in DM's.",
      });
    }

    if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName);
      if (!command) return;

      try {
        if (command.owner && client.utils.checkOwner(interaction.user.id)) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `\\📛 **Error:** \\📛\n You cannot use that command!`
                )
                .setColor("Red"),
            ],
            ephemeral: true,
          });
        }

        if (!Connect && command.dbRequired) {
          return await interaction.reply({
            content: `This command is unavailable due to having no database setup.`,
            ephemeral: true,
          });
        }

        if (!cooldowns.commands.has(command.data.name)) {
          cooldowns.commands.set(command.data.name, new Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.commands.get(command.data.name);
        const cooldownAmount = (command.cooldown || 10) * 1000; //default of 10 seconds

        if (timestamps.has(interaction.user.id)) {
          if (!client.utils.checkOwner(interaction.user.id))
            return command.execute(interaction, client);
          else {
            const expirationTime =
              timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
              const timeLeft = (expirationTime - now) / 1000;
              const message = `please wait ${timeLeft.toFixed(
                1
              )} more second(s) before reusing the \`${
                command.data.name
              }\` command.`;
              return interaction.reply({
                embeds: [
                  {
                    title: `Command: \`${command.data.name}\` is on cooldown!`,
                    description: `\\📛 **Error:** \\📛\n ${message}`,
                    color: 0xfc0303,
                  },
                ],
                ephemeral: true,
              });
            }
          }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(
          () => timestamps.delete(interaction.user.id),
          cooldownAmount
        );

        await command.execute(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content:
            "Something went wrong while executing this command, please contact my developer!",
          ephemeral: true,
        });
      }
    } else if (
      interaction.type == InteractionType.ApplicationCommandAutocomplete
    ) {
      const auto = commands.get(interaction.commandName);
      if (!auto) return;

      try {
        await auto.autocomplete(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "Something went wrong...",
          ephemeral: true,
        });
      }
    }
  },
};
