import { cooldown } from '#handlers';

export default {
	name: 'interactionCreate',
	/**
	 *
	 * @param {import("discord.js").ContextMenuCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async execute(interaction, client) {
		const { commands } = client;
		if (interaction.isContextMenuCommand()) {
			const command = commands.get(interaction.commandName).default;
			if (!command) return;

			try {
				if (command.cooldown && Array.isArray(command.cooldown)) {
					await cooldown(command, 'command', interaction);
				}
				// await command.execute(interaction, client);
			} catch (error) {
				console.log(error);
				await interaction.reply({
					content: 'Something went wrong...',
					ephemeral: true,
				});
			}
		}
	},
};
