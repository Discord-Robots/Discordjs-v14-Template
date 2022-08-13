const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.is) {
      const auto = client.autoCompletes.get(interaction.customId);
      if (!auto) return;

      try {
        await auto.execute(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "There is no code for this autocomplete!",
          ephemeral: true,
        });
      }
    }
  },
};
