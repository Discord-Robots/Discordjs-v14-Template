const { ModalSubmitInteraction, Client, EmbedBuilder } = require("discord.js");
const db = require("../../../../models/blocked");

module.exports = {
  data: {
    id: "appeal_modal",
  },
  /**
   *
   * @param {ModalSubmitInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const reason = interaction.fields.getTextInputValue("appeal_reason");
    const doc = await db.findOne({ client_id: client.user.id });
    const user = doc.guilds.guildOwnerId;
    const embed = new EmbedBuilder({
      title: "A new guild block appeal has been submitted!",
      description: reason,
    });
    client.users.cache.get(process.env.BotOwnerID).send({ embeds: [embed] });
    return await interaction.reply({
      content: `Your appeal has been submitted. \nPlease wait for the developer to get back with you.`,
      ephemeral: true,
    });
  },
};
