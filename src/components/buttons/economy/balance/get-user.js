import { ButtonInteraction } from 'discord.js';

export default {
	data: {
		id: 'get-user',
	},
	/**
	 *
	 * @param {ButtonInteraction} interaction
	 * @param {import('#BOT').default} client
	 */
	async execute(interaction, client) {
		return console.log(interaction);
	},
};
