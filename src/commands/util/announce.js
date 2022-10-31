const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const db = require("../../models/guild");

module.exports = {
  category: "util",
  dbRequired: true,
  data: new SlashCommandBuilder()
    .setName("announcement")
    .setDescription("Announces a message")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((setup) =>
      setup
        .setName("setup")
        .setDescription("setup your channel in my database")
        .addChannelOption((channel) =>
          channel
            .setName("channel")
            .setDescription("Channel you wish to send announcements to.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand((send) =>
      send.setName("send").setDescription("Send the announcement")
    ),
  /**
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    const sub = interaction.options.getSubcommand();
    switch (sub) {
      case "setup":
        let doc = await db.findOne({ guildID: interaction.guildId });
        const channelToSave = interaction.options.getChannel("channel");
        const currentChannel = doc.announcementsChannel;
        if (currentChannel) {
          const newChan = interaction.guild.channels.cache.get(
            channelToSave.id
          );
          if (currentChannel === newChan.id) {
            await interaction.reply({
              content: `${newChan} is already saved in my database. Ignoring your command....`,
            });
            setTimeout(async () => {
              await interaction.deleteReply();
            }, 3000);
            return;
          }
          const chanExists = new EmbedBuilder({
            description: `You already have a channel set up in my database as: <#${currentChannel}>\nWould you like to change this channel?`,
            footer: {
              text: `${channelToSave.id}`,
            },
          });
          const ROW = new ActionRowBuilder({
            type: 1,
            components: [
              new ButtonBuilder({
                label: "Yes",
                type: 2,
                custom_id: "chan_yes",
                style: ButtonStyle.Success,
              }),
              new ButtonBuilder({
                label: "No",
                type: 2,
                custom_id: "chan_no",
                style: ButtonStyle.Danger,
              }),
            ],
          });
          return await interaction.reply({
            embeds: [chanExists],
            components: [ROW],
            ephemeral: true,
          });
        } else {
          await doc.updateOne({ announcementsChannel: channelToSave.id });
          await interaction.reply({
            content: `✅ Successfully setup announcements channel as: ${channelToSave}`,
            ephemeral: true,
          });
        }
        break;

      case "send":
        const modal = new ModalBuilder()
          .setCustomId("announce-modal")
          .setTitle("Announcement");

        const messageInput = new TextInputBuilder()
          .setCustomId("message-input")
          .setLabel("Message")
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder("Enter the announcement message")
          .setRequired(true);

        const Row = new ActionRowBuilder().addComponents(messageInput);

        modal.addComponents(Row);

        await interaction.showModal(modal);
        break;

      default:
        break;
    }
  },
};
