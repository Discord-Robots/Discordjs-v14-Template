import { cooldown } from '#handlers';

export default {
	name: 'interactionCreate',
	/**
	 *
	 * @param {import("discord.js").ButtonInteraction} interaction
	 * @param {import("#BOT").default} client
	 * @returns
	 */
	async execute(interaction, client) {
		const { buttons } = client.components;
		if (interaction.isButton()) {
			const button = buttons.get(interaction.customId).default;
			if (!button) return new Error('There is no code for this button!');

			try {
				await cooldown(button, 'button', interaction);
				// await button.execute(interaction, client);
			} catch (error) {
				console.log(error);
			}
		}
	},
};
