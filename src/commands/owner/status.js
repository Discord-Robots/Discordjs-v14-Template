const {
  SlashCommandBuilder,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");
const db = require("../../models/status");

module.exports = {
  owner: true,
  dbRequired: true,
  category: "owner",
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription(
      "Changes the bots status (doesn't actually change bot's activity)."
    )
    .addSubcommand((online) =>
      online.setName("online").setDescription("Brings the bot online.")
    )
    .addSubcommand((offline) =>
      offline.setName("offline").setDescription("Takes bot offline.")
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options } = interaction;
    const doc = await db.findOne({ client_id: client.user.id });
    const sub = options.getSubcommand();
    switch (sub) {
      case "online":
        if (doc.status === "online") {
          await interaction.reply({
            content: "I'm already online dummy, can't you tell??",
            ephemeral: true,
          });
        }
        if (doc.status === "offline") {
          await interaction.deferReply({ fetchReply: true, ephemeral: true });
          await db.updateOne({ status: "online" });
          client.pickPresence();
          await utils.wait(3000);
          await interaction.editReply({ content: "You summoned me?" });
        }
        break;

      case "offline":
        await db.updateOne({ status: "offline" });
        client.user.setStatus("invisible");
        await interaction.reply({ content: "Goodbye!", ephemeral: true });
        break;
      default:
        break;
    }
  },
};
