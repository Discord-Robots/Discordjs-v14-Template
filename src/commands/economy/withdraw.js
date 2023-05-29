import { SlashCommandBuilder } from 'discord.js';
import Eco from '#schemas/economy.js';

export default {
	category: 'economy',
	dbRequired: true,
	cooldown: [1, 'sec'],
	data: new SlashCommandBuilder()
		.setName('withdraw')
		.setDescription('Withraw from bank to wallet.')
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
