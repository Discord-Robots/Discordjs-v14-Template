const { EmbedBuilder } = require('discord.js');
const Guild = require('./models/guild');

module.exports = class Utils {

    constructor(client) {
        this.client = client;
    }

    async guild(guildID, guildName) {
        const guild = await Guild.findOne({
            guildID: guildID
        });
        if (!guild) {
            const newData = new Guild({
                guildID,
                guildName
            });
            newData.save();
            return newData;
        } else {
            return guild;
        }
    }

    async getSetup(guildID) {
        const setup = await Guild.findOne({
            guildID
        });
        return setup;
    }

    async getPrefix(guildID) {
        const prefix = await Guild.findOne({
            guildID
        });
        return prefix.prefix;
    }

    capitalise(string) {
        return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    }

    checkOwner(user) {
        if (user != process.env.BotOwnerID)
            return true
        else return false
    }

    errorEmbed(message, channel) {
        channel.send({ embeds: [new EmbedBuilder().setDescription(`\\📛 **Error:** \\📛\n ${message} `).setColor("Red")] })
    }

    successEmbed(message, channel) {
        channel.send({ embeds: [new EmbedBuilder().setDescription(`\\✅ **Success:** \\✅\n ${message}  `).setColor("Green")] })
    }
}