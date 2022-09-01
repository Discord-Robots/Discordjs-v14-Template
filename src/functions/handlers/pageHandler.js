const {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  client.embedPages = async (interaction, embeds) => {
    const pages = {};
    const getRow = (id) => {
      //Create the action row with buttons
      const row = new ActionRowBuilder({
        components: [
          new ButtonBuilder({
            label: "◀",
            custom_id: "prev_embed",
            style: 1,
            disabled: pages[id] === 0
          }),
          new ButtonBuilder({
            label: "❌",
            custom_id: "end_embed",
            style: 4
          }),
          new ButtonBuilder({
            label: "▶",
            custom_id: "next_embed",
            style: 1,
            disabled: pages[id] === embeds.length - 1
          })
        ]

      });

      // -------------- Any other custom Button (if needed) --------------
      //   row.addComponents(
      //     new ButtonBuilder()
      //       .setLabel('Any label you want')
      //       .setCustomId('custom_id')
      //       .setStyle(ButtonStyle.AnyStyleYouWant)
      //   );
      // -------------- Any other custom Button (if needed) --------------
      return row;
    };

    const id = interaction.user.id;
    pages[id] = pages[id] || 0;
    let Pagemax = embeds.length;

    const embed = embeds[pages[id]];

    await embeds[pages[id]].setFooter({
      text: `Page ${pages[id] + 1} of ${Pagemax}`,
    });

    const replyEmbed = await interaction.reply({
      embeds: [embed],
      components: [getRow(id)],
      //   ephemeral: true,
      fetchReply: true,
    });

    const filter = (i) => i.user.id === interaction.user.id;
    const time = 1000 * 60 * 5;

    const collector = await replyEmbed.createMessageComponentCollector({
      filter,
      time,
    });

    collector.on("collect", async (b) => {
      if (!b) return;
      if (
        b.customId !== "prev_embed" &&
        b.customId !== "next_embed" &&
        b.customId !== "end_embed"
      )
        return;

      b.deferUpdate();

      if (b.customId === "end_embed") return await replyEmbed.delete();
      if (b.customId === "prev_embed" && pages[id] > 0) {
        --pages[id];
      } else if (b.customId === "next_embed" && pages[id] < embeds.length - 1) {
        ++pages[id];
      }
      await embeds[pages[id]].setFooter({
        text: `Page ${pages[id] + 1} of ${Pagemax}`,
      });

      await interaction.editReply({
        embeds: [embeds[pages[id]]],
        components: [getRow(id)],
        // ephemeral: true,
        fetchReply: true,
      });
    });

    // -------------- Not needed --------------
    collector.on("end", async (reason) => {
      if (reason === "time") {
        const warningEmbed = new EmbedBuilder({
          color: 0xd5cf13,
          description: `⚠️ |  Unfortunately, the embed has expired!`
        })

        await interaction.editReply({
          embeds: [warningEmbed],
          components: [],
          ephemeral: true,
        });
      }
    });
    // -------------- Not needed --------------
  };
};
