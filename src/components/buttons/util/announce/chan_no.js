export default {
	data: {
		id: 'chan_no',
	},
	/**
	 *
	 * @param {import("discord.js").ButtonInteraction} interaction
	 * @param {import("#BOT").default} client
	 * @returns
	 */
	async execute(interaction, client) {
		return interaction.update({
			content: 'I have cancelled this action!',
			embeds: [],
			components: [],
		});
	},
};
