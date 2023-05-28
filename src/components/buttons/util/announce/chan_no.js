export default {
	data: {
		id: 'chan_no',
	},
	/**
	 *
	 * @param {import("discord.js").ButtonInteraction} interaction
	 * @param {import("../../../../Structures/bot")} client
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
