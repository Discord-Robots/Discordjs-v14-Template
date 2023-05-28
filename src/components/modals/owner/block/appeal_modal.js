import doc from '../../../../models/blocked';

export default {
	data: {
		id: 'appeal_modal',
	},
	/**
	 *
	 * @param {import("discord.js").ModalSubmitInteraction} interaction
	 * @param {import("../../../../Structures/bot")} client
	 * @returns
	 */
	async execute(interaction, client) {
		const reason = interaction.fields.getTextInputValue('appeal_reason');
		const doc = await db.findOne({ client_id: client.user.id });
		const user = doc.guilds.guildOwnerId;
		const embed = new EmbedBuilder({
			title: 'A new guild block appeal has been submitted!',
			description: reason,
		});
		client.users.cache.get(process.env.BotOwnerID).send({ embeds: [embed] });
		return await interaction.reply({
			content: `Your appeal has been submitted. \nPlease wait for the developer to get back with you.`,
			ephemeral: true,
		});
	},
};
