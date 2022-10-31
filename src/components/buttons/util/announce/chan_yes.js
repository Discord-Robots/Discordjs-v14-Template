const { ButtonInteraction, Client } = require("discord.js");
const Guild = require(`../../../../models/guild.js`);

module.exports = {
    data: {
        id: "chan_yes"
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        let doc = await Guild.findOne({ guildID: interaction.guildId });
        const channelToSave = interaction.message.embeds[0].footer.text;

        let newChannel = await doc.updateOne({ announcementsChannel: channelToSave });
        return await interaction.update({ content: `I have updated your announcements channel: <#${newChannel}>.`, components: [], embeds: [] })
    }
}