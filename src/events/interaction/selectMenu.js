import { cooldown } from '#handlers';

export default {
	name: 'interactionCreate',
	/**
	 *
	 * @param {import("discord.js").AnySelectMenuInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async execute(interaction, client) {
		const { selectMenus } = client.components;
		const { deniedCustomIDs } = client.config;
		if (interaction.isAnySelectMenu()) {
			if (deniedCustomIDs.includes(interaction.customId)) return;
			const menu = selectMenus.get(interaction.customId).default;
			if (!menu) throw new Error('There is no code for this select menu!');

			try {
				// if (menu.cooldown && Array.isArray(menu.cooldown)) {
				// 	await cooldown(menu, 'selectMenu', interaction);
				// }
				await menu.execute(interaction, client);
			} catch (error) {
				console.log(error);
			}
		}
	},
};
