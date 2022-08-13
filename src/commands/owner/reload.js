const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
    Client,
} = require("discord.js");
const { ClientRequest } = require("node:http");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
    developer: true,
    category: "owner",
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload your events/commands"),
    // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
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
                await client.commands.clear();
                await wait(3000)
                await client.handleCommands();
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(
                                `\\✅ **Success:** \\✅\n Reloaded the commands and events! `
                            )
                            .setColor("Green"),
                    ],
                    ephemeral: true,
                });

            } catch (error) {
                interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`\\📛 **Error:** \\📛\n ${error.message} `)
                            .setColor("Red"),
                    ],
                    ephemeral: true,
                });
            }
        }
    }
}
