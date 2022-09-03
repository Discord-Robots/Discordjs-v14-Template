module.exports = {
    data: {
        name: "unblock-no",
    },
    async execute(interaction, client) {
        return interaction.update({
            content: "I have cancelled this action!",
            components: [],
            embeds: []
        });
    },
};
