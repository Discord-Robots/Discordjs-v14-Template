const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    category: "economy",
    cooldown: 1000,
    data: new SlashCommandBuilder()
        .setName("beg")
        .setDescription("Beg for cards")
        .setDMPermission(false),
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     * @param {import("../../Structures/bot")} client
     * @returns
     */
    async execute(interaction, client) {
        const { currency, bank, wallet } = client.config.economy;

    },
};
