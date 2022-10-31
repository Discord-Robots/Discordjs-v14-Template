const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  category: "fun",
  developer: true,
  data: new SlashCommandBuilder()
    .setName("together")
    .setDescription("Play games with friends using Discord Together!")
    .setDMPermission(false)
    .addStringOption((options) =>
      options
        .setName("game")
        .setDescription("The game you would like to play.")
        .addChoices(
          {
            name: "Poker",
            value: "755827207812677713",
          },
          {
            name: "Chess",
            value: "832012774040141894",
          },
          {
            name: "Checkers",
            value: "832013003968348200",
          },
          {
            name: "Betrayal",
            value: "773336526917861400",
          },
          {
            name: "Fishington",
            value: "814288819477020702",
          },
          {
            name: "Words Snack",
            value: "879863976006127627",
          },
          {
            name: "Doodle Crew",
            value: "878067389634314250",
          },
          {
            name: "Spellcast",
            value: "852509694341283871",
          },
          {
            name: "Awkword",
            value: "879863881349087252",
          },
          {
            name: "Letter Tile",
            value: "879863686565621790",
          },
          {
            name: "Putt Party",
            value: "763133495793942528",
          },
          {
            name: "Sketch Heads",
            value: "902271654783242291",
          },
          {
            name: "Ocho",
            value: "832025144389533716",
          }
        )
        .setRequired(true)
    ),
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("../../Structures/bot")} client
   * @returns
   */
  async execute(interaction, client) {
    const game = interaction.options.getString("game");
    if (interaction.member.voice.channel) {
      try {
        await fetch(
          `https://discord.com/api/v8/channels/${interaction.member.voice.channel.id}/invites`,
          {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: game,
              target_type: 2,
              temporary: false,
              validate: null,
            }),
            headers: {
              Authorization: `Bot ${client.token}`,
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((invite) => {
            if (invite.error || !invite.code || Number(invite.code) === 50013) {
              return console.log(
                `(${interaction.guild.name}) An error occurred while starting activity id ${game}`
              );
            }
            interaction.reply(
              `${interaction.member} https://discord.com/invite/${invite.code}`
            );
          });
      } catch (err) {
        console.log(
          `(${interaction.guild.name}) An error occurred while starting activity id ${game}`
        );
      }
    }
    return interaction.reply({
      embeds: [
        {
          author: {
            name: "Discord Together",
            iconURL: interaction.guild.iconURL(),
          },
          description: `ERROR: You must be in a voice channel and on a desktop to use this feature.`,
          color: 0xad1a1f,
        },
      ],
      ephemeral: true,
    });
  },
};
