const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isContextMenuCommand()) {
      const menu = client.contextMenus.get(interaction.customId);
      if (!menu) return;

      try {
        await menu.execute(client, interaction);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "There is no code for this context menu!",
          ephemeral: true,
        });
      }
    }
  },
};
