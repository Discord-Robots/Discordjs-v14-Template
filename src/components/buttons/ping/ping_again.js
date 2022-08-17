const PING = require("../../../commands/util/ping");
const {
    Client,
    SlashCommandBuilder,
    CommandInteraction,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    ActionRowBuilder,
} = require("discord.js");
const ms = require("ms");

module.exports = {
    data: {
        name: `ping_again`,
    },
    async execute(interaction, client) {
        // PING.execute(interaction, client, true);

        // const msg = await interaction.deferReply({
        //     fetchReply: true,
        // });
        const again = new ButtonBuilder({
            custom_id: 'ping_again',
            label: 'Ping me again',
            style: ButtonStyle.Success,
            type: ComponentType.Button
        });
        const stop = new ButtonBuilder({
            custom_id: 'ping_stop',
            label: 'No more pinging me!',
            style: ButtonStyle.Danger,
            type: ComponentType.Button
        });
        const row = new ActionRowBuilder().addComponents(again, stop)
        const embed = new EmbedBuilder({
            title: `Bot and API Latency`,
            description: `Here you can see the Bot's and the API latency.`,
            color: client.color,
            fields: [
                {
                    name: `Bot Latency`,
                    value: `${ms(msg.createdTimestamp - interaction.createdTimestamp, {
                        long: true,
                    })}`,
                    inline: true,
                },
                {
                    name: `API Latency`,
                    value: `${ms(client.ws.ping, { long: true })}`,
                    inline: true,
                },
                {
                    name: `\u200b`,
                    value: `The button below will re-send the ping command.`,
                    inline: false,
                },
            ],

        });
        await interaction.editReply({
            embeds: [embed],
            components: [row],
        });
    },
};
