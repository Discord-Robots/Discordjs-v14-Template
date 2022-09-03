const { ButtonInteraction, Client } = require("discord.js");
const doc = require("../../../../models/blocked");

module.exports = {
  data: {
    id: "unblock-yes",
  },
  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   * @returns
   */
  async execute(interaction, client) {
    const gid = interaction.message.embeds[0].footer.text;

    await doc.findOneAndUpdate(
      {
        client_id: client.user.id,
      },
      {
        $pull: {
          guilds: {
            guildID: gid,
          },
        },
      }
    );

    return await interaction.update({
      content: "✅ This guild has been unblocked!",
      embeds: [],
      components: [],
    });
  },
};
