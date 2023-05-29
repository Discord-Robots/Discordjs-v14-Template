import { SlashCommandBuilder } from 'discord.js';
import Eco from '#schemas/economy.js';

export default {
	category: 'economy',
	dbRequired: true,
	cooldown: [1, 'day'],
	data: new SlashCommandBuilder()
		.setName('beg')
		.setDescription('Beg for currency.')
		.setDMPermission(false),
	/**
	 *
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 * @returns
	 */
	execute: async (interaction, client) => {
		const { currency, bank, wallet } = client.config.economy;
	},
};
