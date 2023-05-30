import { cooldown } from '#handlers';

export default {
	name: 'interactionCreate',
	/**
	 *
	 * @param {import("discord.js").ModalSubmitInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async execute(interaction, client) {
		const { modals } = client.components;
		if (interaction.isModalSubmit()) {
			const modal = modals.get(interaction.customId).default;
			if (!modal) return;

			try {
				if (modal.cooldown && Array.isArray(modal.cooldown)) {
					await cooldown(modal, 'modal', interaction);
				}
				// return await modal.execute(interaction, client);
			} catch (error) {
				console.log(error);
				await interaction.reply({
					content: 'There is no code for this modal!',
					ephemeral: true,
				});
			}
		}
	},
};
