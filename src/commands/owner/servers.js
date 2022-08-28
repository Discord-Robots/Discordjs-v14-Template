const { SlashCommandBuilder, EmbedBuilder, CommandInteraction, Client } = require("discord.js");

module.exports = {
    owner: true,
    data: new SlashCommandBuilder()
        .setName("servers")
        .setDescription("List of servers the bot is in.")
        .addStringOption(options =>
            options
                .setName("serverid")
                .setDescription("Get info about a specific server by id.")
        ),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(interaction, client) {
        let gid = interaction.options.getString('serverid');
        let Guild = client.guilds.cache.get(gid)

        if (Guild) {
            const name = Guild.name;
            const ID = Guild.id;
            const ownerName = Guild.members.cache.get(Guild.ownerId).user.username
            const ownerDescriminator = Guild.members.cache.get(Guild.ownerId).user.discriminator;
            const ownerID = Guild.ownerId;
            const mCount = Guild.members.cache.filter(m => m.user.bot === false).size
            const bCount = Guild.members.cache.filter(m => m.user.bot === true).size
            const date = `<t:${Math.floor(Guild.createdAt / 1000) + 3600}:D>`
            let comOp;
            if (Guild.features.includes("COMMUNITY")) { comOp = true } else comOp = false

            const info = new EmbedBuilder()
                .setTitle(name)
                .setThumbnail(Guild.iconURL({ dynamic: true }))
                .addFields(
                    { name: `Guild ID`, value: `${ID}`, inline: true },
                    { name: `Community?`, value: `${comOp}`, inline: true },
                    { name: `Guild Created:`, value: `${date}`, inline: true },
                    { name: `Guild Owner`, value: `${ownerName}#${ownerDescriminator}`, inline: true },
                    { name: `Guild Owner ID`, value: `${ownerID}`, inline: true },
                    { name: `\u200b`, value: `\u200b`, inline: true },
                    { name: `Member Count`, value: `${mCount}`, inline: true },
                    { name: `Bot Count`, value: `${bCount}`, inline: true },
                    { name: `\u200b`, value: `\u200b`, inline: true },
                )
                .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ dynamic: true }) });
            if (Guild.banner) info.setImage(Guild.bannerURL({ dynamic: true }))
            return await interaction.reply({ embeds: [info], ephemeral: true });
        } else {
            let d = '';
            client.guilds.cache.forEach(guild =>
                d += `${guild.name} (${guild.id})` + '\n'
            );
            const embed2 = new EmbedBuilder().setTitle('Here is a list of servers that I am in!').setDescription(d)
            return await interaction.reply({ embeds: [embed2], ephemeral: true })
        }
    }
}