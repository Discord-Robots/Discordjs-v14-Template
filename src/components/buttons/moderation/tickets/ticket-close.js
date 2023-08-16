import { ButtonInteraction, GuildMember } from 'discord.js';
import {
	createTranscript,
	generateFromMessages,
} from 'discord-html-transcripts';

export default {
	data: {
		id: 'ticket-close',
	},
	/**
	 *
	 * @param {ButtonInteraction} interaction
	 * @param {import('#BOT').default} client
	 */
	async execute(interaction, client) {
		const { TicketConfig } = client.config;
		const category = interaction.channel.name.split(' Ticket')[0];
		/**
		 * @type {string[]}
		 */
		let ids = [];
		for (const [cat, ping] of Object.entries(TicketConfig.pings)) {
			if (cat === category) {
				ping.forEach((x) => ids.push(client.utils.getId(x)));
			}
		}
		/**
		 * @type {GuildMember}
		 */
		// @ts-ignore
		const member = interaction.member;
		if (!member.roles.cache.hasAny(...ids)) {
			return await interaction.reply({
				ephemeral: true,
				content: `${member}, You cannot use this button!`,
			});
		} else {
		}
	},
};
