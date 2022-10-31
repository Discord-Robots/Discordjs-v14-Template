const { ButtonInteraction, Client } = require("discord.js");

module.exports = {
    data: {
        id: "chan_no"
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        return interaction.update({
            content: "I have cancelled this action!",
            embeds: [],
            components: [],
        });
    }
}