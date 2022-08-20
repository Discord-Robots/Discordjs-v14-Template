const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
    Client,
} = require("discord.js");

module.exports = {
    owner: true,
    developer: true,
    category: "owner",
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload your commands")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @returns
     */
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true, fetchReply: true })

        try {
            await interaction.editReply({ content: "Reloading commands.....", ephemeral: true })
            await client.reload();
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            `\\✅ **Success:** \\✅\n Reloaded the commands! `
                        )
                        .setColor("Green"),
                ],
                ephemeral: true,
            });

        } catch (error) {
            console.error(error)
        }
    }
}
