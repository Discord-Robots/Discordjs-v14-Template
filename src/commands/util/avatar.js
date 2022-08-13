const { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder, Client, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('avatar')
        .setType(ApplicationCommandType.User),

    /**
     * 
     * @param {ContextMenuCommandBuilder} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const avatarEmbed = new EmbedBuilder()
            .setAuthor({ name: `${targetUser.username}'s avatar!` })
            .setImage(`${targetUser.displayAvatarURL({ size: 1024 })}`)
        await interaction.reply({ embeds: [avatarEmbed] })
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription("Gets a users avatar!")
        .addUserOption((user) =>
            user.setName("target").setDescription("Select a user!")),

    /**
     * 
     * @param {SlashCommandBuilder} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const targetUser = interaction.options.getUser("target") || interaction.user;

        const avatarEmbed = new EmbedBuilder()
            .setAuthor({ name: `${targetUser.username}'s avatar!` })
            .setImage(`${targetUser.displayAvatarURL({ size: 1024 })}`)
        await interaction.reply({ embeds: [avatarEmbed] })
    }
}