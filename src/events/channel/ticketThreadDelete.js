import { Events } from 'discord.js';
import ticketSchema from '#schemas/tickets.js';

export default {
	name: Events.ThreadDelete,

	/**
	 * @param {import("discord.js").ThreadChannel} channel
	 */
	async execute(channel) {
		let tickets = await ticketSchema.findOne({ Guild: channel.guildId });
		if (channel.parentId === tickets.Category && channel.name.startsWith('')) {
		}
	},
};
