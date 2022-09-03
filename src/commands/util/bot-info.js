const {
    Client,
    SlashCommandBuilder,
    CommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
} = require("discord.js");
const { version, dependencies } = require('../../../package.json');
const ms = require("ms");
const os = require("os");
const { utc } = require('moment');

module.exports = {
    developer: true,
    category: "util",
    data: new SlashCommandBuilder()
        .setName("bot-info")
        .setDescription("Returns Bot OS info.")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @returns
     */
    async execute(interaction, client) {

        const core = os.cpus()[0];
        const embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(interaction.guild.members.me.displayHexColor || 'BLUE')
            .addFields({
                name: 'General', value:
                    `**❯ Client:** ${client.user.tag} (${client.user.id})
                **❯ Commands:** ${client.commands.size}
                **❯ Servers:** ${client.guilds.cache.size.toLocaleString()} 
                **❯ Users:** ${client.users.cache.filter(m => !m.bot).size}
                **❯ Channels:** ${client.channels.cache.size.toLocaleString()}
                **❯ Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}
                **❯ Node.js:** ${process.version}
                **❯ Version:** v${version}
                **❯ Discord.js:** v${dependencies["discord.js"]}`,
            })//${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
            .addFields({
                name: 'System', value:
                    `**❯ Platform:** ${process.platform}
                **❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}
                **❯ CPU:**
                \u3000 Cores: ${os.cpus().length}
                \u3000 Model: ${core.model}
                \u3000 Speed: ${core.speed}MHz
                **❯ Memory:**
                \u3000 Total: ${client.utils.formatBytes(process.memoryUsage().heapTotal)}
                \u3000 Used: ${client.utils.formatBytes(process.memoryUsage().heapUsed)}`,
            })
            .setTimestamp();

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}