const {
    Client,
    CommandInteraction,
    EmbedBuilder
} = require("discord.js");
const { Connect, BotOwnerID } = process.env;
const db = require("../../models/status");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (!interaction.inGuild()) {
            return interaction.reply({
                content: "I do not allow commands or interactions in DM's.",
            });
        }
        if (Connect) {
            let doc = await db.findOne({ client_id: client.user.id });
            if (doc.status === "offline") {
                if (interaction.member.id !== BotOwnerID) {
                    return await interaction.reply({ content: "The application did not respond", ephemeral: true })
                }
            }
        }
    }
}