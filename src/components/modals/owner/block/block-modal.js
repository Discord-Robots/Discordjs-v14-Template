const doc = require("../../../../models/blocked");
const { BotOwnerID } = process.env;

module.exports = {
  data: {
    id: "block-modal",
  },
  /**
   *
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   * @param {import("../../../../Structures/bot")} client
   * @returns
   */
  async execute(interaction, client) {
    const gid = interaction.fields.getTextInputValue("block_gid");
    const reason = interaction.fields.getTextInputValue("reason_for_block");
    let guild = client.guilds.cache.get(gid);
    const ownerTag = guild.members.cache.get(guild.ownerId).user.tag;
    await doc.findOneAndUpdate(
      {
        client_id: client.user.id,
      },
      {
        $push: {
          guilds: {
            guildID: gid,
            reason: reason,
            guildOwnerId: guild.ownerId,
            guildOwnerTag: ownerTag,
          },
        },
      }
    );
    guild.members.cache
      .get(guild.ownerId)
      .send({
        embeds: [
          {
            description: `Your guild: ${guild.name} has been blocked from using my interactions, so I left.\nReason for block: ${reason}.\n\n
            If you would like to appeal your block, Please join the support server and run \`appeal\` in the commands channel.`,
          },
        ],
      })
      .catch(console.error);
    client.users.cache.get(BotOwnerID).send({
      embeds: [
        {
          title: `New blocked guild:`,
          fields: [
            { name: `Guild Name:`, value: guild.name, inline: true },
            { name: `Guild ID:`, value: gid, inline: true },
            { name: `Guild Owner:`, value: ownerTag, inline: true },
            { name: `Reason:`, value: reason, inline: true },
          ],
        },
      ],
    });
    await guild.leave().catch(console.error);
    return await interaction.reply({
      content: "Guild has been added to document.",
      embeds: [
        {
          description: `${guild.name} has been blocked from using interactions!`,
        },
      ],
      ephemeral: true,
    });
  },
};
