const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
    Client,
} = require("discord.js");

module.exports = {
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
        if (!client.config.owners.includes(interaction.user.id)) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            `\\📛 **Error:** \\📛\n You cannot use that command!`
                        )
                        .setColor("Red"),
                ],
                ephemeral: true,
            });
        } else {
            try {
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
}
