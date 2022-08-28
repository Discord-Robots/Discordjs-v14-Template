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
        const { commands, cooldowns } = client;

        if (interaction.isContextMenuCommand()) {
            const command = commands.get(interaction.commandName);
            if (!command) return;

            try {
                if (!cooldowns.has(command.data.name)) {
                    cooldowns.set(command.data.name, new Collection());
                }
                const now = Date.now();
                const timestamps = cooldowns.get(command.data.name);
                const cooldownAmount = (command.cooldown || 10) * 1000; //default of 10 seconds

                if (timestamps.has(interaction.user.id)) {
                    if (!client.utils.checkOwner(interaction.user.id))
                        return command.execute(interaction, client);
                    else {
                        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                        if (now < expirationTime) {
                            const timeLeft = (expirationTime - now) / 1000;
                            const message = `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.data.name}\` Context Menu Command.`
                            return interaction.reply(
                                {
                                    embeds: [
                                        {
                                            title: `Context Menu Command: \`${command.data.name}\` is on cooldown!`,
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
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: "Something went wrong...",
                    ephemeral: true,
                });
            }
        }
    }
}