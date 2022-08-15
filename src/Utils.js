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

    async setPresence() {
        let statusArray = require("./config.json").statuses, i = 0;
        let option = statusArray[i++ % statusArray.length]
        try {
            await this.client.user.setPresence({
                activities: [
                    {
                        name: option.content,
                        type: option.type
                    }
                ],
                status: option.status
            })
            setInterval(() => this.setPresence, 8000)
        } catch (error) {
            console.log(error)
        }

    }

}
