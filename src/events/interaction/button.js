const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return;

      try {
        await button.execute(client, interaction);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "There is no code for this button!",
          ephemeral: true,
        });
      }
    }
  },
};
