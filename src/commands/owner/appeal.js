const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
} = require("discord.js");

module.exports = {
  category: "owner",
  dbRequired: true,
  data: new SlashCommandBuilder()
    .setName("appeal")
    .setDescription("Appeals a guild block.")
    .setDMPermission(false)
    .addStringOption((guildId) =>
      guildId
        .setName("guild_id")
        .setDescription("Provide the guild id that was blocked.")
        .setRequired(true)
    ),
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    const { options } = interaction;
    let db = await doc.findOne({ client_id: client.user.id });
    const gid = options.getString("guild_id", true);
    let guildId = db.guilds.find((x) => x.guildID === gid);
    let ownerId = db.guilds.find((x) => x.guildOwnerId === interaction.user.id);
    let matched = db.guilds.ownerId === ownerId;

    if (!guildId) {
      return interaction.reply({
        content: "That guild id does not exist in my database.",
        ephemeral: true,
      });
    }

    if (guildId && !matched) {
      return interaction.reply({
        content: `You are not the owner of that guild, please advise the server owner to appeal the block in my DM.\nGuild Owner: ${db.guilds.guildOwnerTag}`,
        ephemeral: true,
      });
    }
    if (guildId && matched) {
      return await interaction.showModal(
        new ModalBuilder({
          custom_id: "appeal_modal",
          title: "Appeal Guild Block",
          components: [
            new ActionRowBuilder({
              type: 1,
              components: [
                new TextInputBuilder({
                  custom_id: "appeal_reason",
                  label: "Reason for your appeal",
                  placeholder: "Give me a reason appealing this block.",
                  style: 2,
                  type: 4,
                }),
              ],
            }),
          ],
        })
      );
    }
  },
};

//Only use if you received a dm from the bot saying your guild has been blocked.
