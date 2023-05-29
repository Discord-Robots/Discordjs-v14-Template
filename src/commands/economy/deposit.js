import { SlashCommandBuilder } from 'discord.js';
import Eco from '#schemas/economy.js';

export default {
	category: 'economy',
	dbRequired: true,
	cooldown: [1, 'sec'],
	data: new SlashCommandBuilder()
		.setName('deposit')
		.setDescription('Deposit currency into bank from wallet.')
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
