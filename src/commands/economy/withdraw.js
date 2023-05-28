const { SlashCommandBuilder } = require('discord.js');
const Eco = require('../../models/economy');

module.exports = {
	category: 'economy',
	cooldown: 1000,
	data: new SlashCommandBuilder()
		.setName('withdraw')
		.setDescription('Withraw from bank to wallet.')
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
