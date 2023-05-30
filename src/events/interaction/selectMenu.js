import { cooldown } from '#handlers';

export default {
	name: 'interactionCreate',
	/**
	 *
	 * @param {import("discord.js").StringSelectMenuInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async execute(interaction, client) {
		const { selectMenus } = client.components;
		const { deniedCustomIDs } = client.config;
		if (interaction.isStringSelectMenu()) {
			if (deniedCustomIDs.includes(interaction.customId)) return;
			const menu = selectMenus.get(interaction.customId).default;
			if (!menu) return;

			try {
				if (menu.cooldown && Array.isArray(menu.cooldown)) {
					await cooldown(menu, 'selectMenu', interaction);
				}
				await menu.execute(interaction, client);
			} catch (error) {
				console.log(error);
				await interaction.reply({
					content: 'There is no code for this select menu!',
					ephemeral: true,
				});
			}
		}
	},
};
