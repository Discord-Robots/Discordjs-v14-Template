import { SlashCommandBuilder } from 'discord.js';
import Eco from '#schemas/economy.js';

export default {
	category: 'economy',
	dbRequired: true,
	cooldown: [1, 'sec'],
	data: new SlashCommandBuilder()
		.setName('give')
		.setDescription('Give someone some of your currency.')
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
