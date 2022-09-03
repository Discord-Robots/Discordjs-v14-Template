const doc = require("../../models/blocked");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  Client,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  owner: true,
  dbRequired: true,
  category: "owner",
  data: new SlashCommandBuilder()
    .setName("block")
    .setDescription("Stops a specific server from using the bot.")
    .addStringOption((option) =>
      option
        .setName("guildid")
        .setDescription(
          "Specify the guild id of which you would like to block."
        )
        .setRequired(true)
    ),

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply({ fetchReply: true, ephemeral: true })
    const { options } = interaction;
    let gid = options.getString("guildid");
    let guild = client.guilds.cache.get(gid);
    let db = await doc.findOne({ client_id: client.user.id });
    if (db.guilds.includes(gid)) {
      const Action = new ActionRowBuilder({
        type: 1,
        components: [
          new ButtonBuilder({
            customId: "unblock-yes",
            emoji: "✅",
            style: 1,
            type: 2,
          }),
          new ButtonBuilder({
            customId: "unblock-no",
            emoji: "❌",
            style: 1,
            type: 2,
          })
        ]
      });

      return await interaction.editReply({
        embeds: [
          new EmbedBuilder({
            description:
              "That guild is already blocked. Would you like to unblock it?",
            footer: { text: guild.id },
          }),
        ],
        components: [Action],
        ephemeral: true,
      });
    }
    await doc.findOneAndUpdate(
      {
        client_id: client.user.id,
      },
      {
        $push: {
          guilds: gid,
        },
      }
    );
    return await interaction.editReply({
      content: "Guild has been added to document.",
      embeds: [
        new EmbedBuilder({
          description: `${guild.name} has been blocked from using interactions!`,
        }),
      ],
      ephemeral: true,
    });
  },
};
