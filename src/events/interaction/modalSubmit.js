const { Client, CommandInteraction, InteractionType, Collection } = require("discord.js");
const data = {};

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        // data.guild = await client.utils.guild(interaction.guild.id);
        const { modals, componentCooldowns } = client;
        if (interaction.type === InteractionType.ModalSubmit) {
            const modal = modals.get(interaction.customId);
            if (!modal) return;

            try {
                if (!componentCooldowns.modals.has(modal.data.name)) {
                    componentCooldowns.modals.set(modal.data.name, new Collection());
                }
                const now = Date.now();
                const timestamps = componentCooldowns.modals.get(modal.data.name);
                const cooldownAmount = (modal.cooldown || 10) * 1000; //default of 10 seconds

                if (timestamps.has(interaction.user.id)) {
                    if (!client.utils.checkOwner(interaction.user.id))
                        return modal.execute(interaction, client);
                    else {
                        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                        if (now < expirationTime) {
                            const timeLeft = (expirationTime - now) / 1000;
                            const message = `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${modal.data.name}\` modal.`
                            return interaction.reply(
                                {
                                    embeds: [
                                        {
                                            title: `Modal: \`${modal.data.name}\` is on cooldown!`,
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
                await modal.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: "There is no code for this modal!",
                    ephemeral: true,
                });
            }
        }
    }
}