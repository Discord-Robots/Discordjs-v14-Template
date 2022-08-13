const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      if (!modal) return;

      try {
        await modal.execute(client, interaction);
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
