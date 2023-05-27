const { SlashCommandBuilder, GuildMember, EmbedBuilder } = require("discord.js");
const Eco = require('../../models/economy');
const Guild = require('../../models/guild');

module.exports = {
    category: "economy",
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Check a users balance.")
        .setDMPermission(false)
        .addUserOption(user =>
            user
                .setName('user')
                .setDescription('Select a user to get balance. (skip for yourself)')
        ),
    /**
     *
     * @param {import("discord.js").ChatInputCommandInteraction} interaction
     * @param {import("../../Structures/bot")} client
     * @returns
     */
    async execute(interaction, client) {
        let guild = await Guild.findOne({
            guildID: interaction.guildID
        });
        if (interaction.channelId !== guild.botCommandsChannel) return interaction.reply({
            content: `Please run this command in this guilds designated bot commands channel!`,
            ephemeral: true
        });
        const { currency, bank, wallet } = client.config.economy;
        /**
         * @type {GuildMember}
         */
        const member = interaction.options.getMember('user') || interaction.member;
        if (member.user.bot) return interaction.reply({
            content: `${member.user.username} cannot have a balance because they are a bot!`
        });
        let profileData = await Eco.findOne({
            userID: member.id,
            guildID: interaction.guildId
        });
        if (!profileData) return interaction.reply({
            content: `${member.user.username} has no balance!`
        });
        const __ = profileData.wallet <= 100 ? `${member} should chat more!` : `${member} enjoys chatting in this server!`
        const Balance = new EmbedBuilder({
            author: {
                name: `${currency} Balance for ${member}:`,
                icon_url: member.displayAvatarURL()
            },
            fields: [
                { name: `${wallet} Wallet:`, value: profileData.wallet, inline: true },
                { name: `${bank}, Bank:`, value: profileData.bank, inline: true },
                { name: __, value: '\u200b' }
            ],
            footer: {
                text: `Requested by: ${interaction.user.username}`,
                icon_url: interaction.member.displayAvatarURL()
            }
        });
        return await interaction.reply({
            embeds: [Balance]
        })
    },
};
