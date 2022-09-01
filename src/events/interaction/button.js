const { Client, CommandInteraction, Collection } = require("discord.js");
const data = {};

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { buttons, cooldowns } = client;
        if (interaction.isButton()) {
            const button = buttons.get(interaction.customId);
            if (!button) return new Error('There is no code for this button!')

            try {
                if (!cooldowns.buttons.has(button.data.name)) {
                    cooldowns.buttons.set(button.data.name, new Collection());
                }
                const now = Date.now();
                const timestamps = cooldowns.buttons.get(button.data.name);
                const cooldownAmount = (button.cooldown || 10) * 1000; //default of 10 seconds

                if (timestamps.has(interaction.user.id)) {
                    if (!client.utils.checkOwner(interaction.user.id))
                        return button.execute(interaction, client);
                    else {
                        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                        if (now < expirationTime) {
                            const timeLeft = (expirationTime - now) / 1000;
                            const message = `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${button.data.name}\` button.`
                            return interaction.reply(
                                {
                                    embeds: [
                                        {
                                            title: `Button: \`${button.data.name}\` is on cooldown!`,
                                            description: `\\📛 **Error:** \\📛\n ${message}`,
                                            color: 0xfc0303,
                                        }
                                    ],
                                    ephemeral: true
                                }
                            )
                        }
                    }
                }
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
                await button.execute(interaction, client);
            } catch (error) {
                console.log(error);
            }
        }
    }
}