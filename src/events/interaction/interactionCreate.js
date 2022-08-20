const { Client, CommandInteraction, InteractionType } = require("discord.js");
const data = {};

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    // data.guild = await client.utils.guild(interaction.guild.id);
    const { commands, modals, buttons, selectMenus, autoCompletes } = client;

    if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "Something went wrong...",
          ephemeral: true,
        });
      }
    }

    else if (interaction.isContextMenuCommand()) {
      const contextCommand = commands.get(interaction.commandName);
      if (!contextCommand) return;

      try {
        await contextCommand.execute(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "Something went wrong...",
          ephemeral: true,
        });
      }
    }

    else if (interaction.isButton()) {
      const button = buttons.get(interaction.customId);
      if (!button) return new Error('There is no code for this button!')

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.log(error);
      }
    }

    else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
      const auto = commands.get(interaction.commandName);
      if (!auto) return;

      try {
        await auto.autocomplete(interaction, client);
      } catch (error) {
        console.log(error);
      }
    }

    else if (interaction.isSelectMenu()) {
      const menu = selectMenus.get(interaction.customId);
      if (!menu) return;

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "There is no code for this select menu!",
          ephemeral: true,
        });
      }
    }

    else if (interaction.type === InteractionType.ModalSubmit) {
      const modal = modals.get(interaction.customId);
      if (!modal) return;

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "There is no code for this modal!",
          ephemeral: true,
        });
      }
    }
  },
};
