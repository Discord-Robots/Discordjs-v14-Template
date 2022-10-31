const doc = require("../../../../models/blocked");

module.exports = {
  data: {
    id: "unblock-yes",
  },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {import("../../../../Structures/bot")} client
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
