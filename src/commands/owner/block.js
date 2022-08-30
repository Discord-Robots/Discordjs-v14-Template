const doc = require("../../models/blocked");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  Client,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  owner: true,
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
    const { options } = interaction;
    let gid = options.getString("guildid");
    let guild = client.guilds.cache.get(gid);
    let db = await doc.findOne({ client_id: client.user.id });
    if (!db) {
      new doc({
        client_id: client.user.id,
        guilds: [],
      }).save();
      return await interaction.reply({
        content: "Document has been added to DB.",
        embeds: [
          new EmbedBuilder({
            description: `${guild.name} has been blocked from using interactions!`,
          }),
        ],
        ephemeral: true,
      });
    } else {
      if (db.guilds.includes(gid)) {
        const yes = new ButtonBuilder({
          customId: "unblock-yes",
          emoji: "✅",
          style: ButtonStyle.Primary,
          type: ComponentType.Button,
        });
        const no = new ButtonBuilder({
          customId: "unblock-no",
          emoji: "❌",
          style: ButtonStyle.Primary,
          type: ComponentType.Button,
        });
        const Action = new ActionRowBuilder({
          components: [yes, no],
          type: ComponentType.ActionRow,
        });
        return await interaction.reply({
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
      return await interaction.reply({
        content: "Guild has been added to document.",
        embeds: [
          new EmbedBuilder({
            description: `${guild.name} has been blocked from using interactions!`,
          }),
        ],
        ephemeral: true,
      });
    }
  },
};
