import Guild from '#schemas/guild.js';

export default {
	data: {
		id: 'chan_yes',
	},
	/**
	 *
	 * @param {import("discord.js").ButtonInteraction} interaction
	 * @param {import("#BOT").default} client
	 * @returns
	 */
	async execute(interaction, client) {
		let doc = await Guild.findOne({ guildID: interaction.guildId });
		const channelToSave = interaction?.message?.embeds[0]?.footer?.text;

		let newChannel = await doc?.updateOne({
			announcementsChannel: channelToSave,
		});
		return await interaction.update({
			content: `I have updated your announcements channel: <#${newChannel}>.`,
			components: [],
			embeds: [],
		});
	},
};
