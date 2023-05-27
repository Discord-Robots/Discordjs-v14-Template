const {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
    Permissions
} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('permissions')
        .setDescription('Displays Permissions')
        .addUserOption((user) =>
            user.setName('user').setDescription('Select a user').setRequired(true)
        ),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { options } = interaction;
        const Member = options.getMember('user');
        const USER = options.getUser('user');

        let Embed = new EmbedBuilder().setColor('DarkRed');

        if (!Member)
            return interaction.reply({
                embeds: [Embed.setDescription("The member couldn't be found")],
                ephemeral: true,
            });

        let permissionFlags = Object.keys(PermissionFlagsBits);
        let output = `Permissions of ${Member}\n\`\`\``;
        for (let i = 0; i < permissionFlags.length; i++) {
            let permissionName = permissionFlags[i];
            let hasPermission = Member.permissions.has(permissionName);
            output += `${permissionName} ${hasPermission ? '✅' : '❌'}\n`;
        }
        output += `\`\`\``;
        const PermsEmbed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`🛠 | Permissions`)
            .setDescription(output)
            .setFooter({ text: `${USER.tag}`, iconURL: Member.displayAvatarURL() })
            .setTimestamp();
        return interaction.reply({ embeds: [PermsEmbed] });
    },
};
