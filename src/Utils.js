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
                guildID: guildID,
                guildName: guildName
            });
            newData.save();
            return newData;
        } else {
            return guild;
        }
    }

    async getSetup(guildID) {
        const setup = await Guild.findOne({
            guildID: guildID
        });
        return setup;
    }

    async getPrefix(guildID) {
        const prefix = await Guild.findOne({
            guildID: guildID
        });
        return prefix.prefix;
    }

    capitalise(string) {
        return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
    }


}
