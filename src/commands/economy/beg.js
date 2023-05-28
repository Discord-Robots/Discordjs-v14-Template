import { SlashCommandBuilder } from 'discord.js';
import Eco from '../../models/economy';

export default {
	category: 'economy',
	cooldown: [1, 'day'],
	data: new SlashCommandBuilder()
		.setName('beg')
		.setDescription('Beg for currency.')
		.setDMPermission(false),
	/**
	 *
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("../../Structures/bot")} client
	 * @returns
	 */
	execute: async (interaction, client) => {
		const { currency, bank, wallet } = client.config.economy;
	},
};
