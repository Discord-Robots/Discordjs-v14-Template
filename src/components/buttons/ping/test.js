module.exports = {
    data: {
        name: `test`,
    },
    async execute(interaction, client) {
        //run the ping command first to get this button!
        interaction.reply({ content: 'The button works!' })
    },
};
