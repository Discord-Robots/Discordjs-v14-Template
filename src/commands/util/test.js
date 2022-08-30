const {
    Client,
    SlashCommandBuilder,
    CommandInteraction,
    EmbedBuilder
} = require("discord.js");
const ms = require("ms");

module.exports = {
    developer: true,
    category: "util",
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Returns an embed."),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @returns
     */
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        })
        let message = `Test command works`

        client.utils.successEditEmbed(message, interaction)

    },
};
