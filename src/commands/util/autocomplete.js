const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 'util',
	developer: true,
	data: new SlashCommandBuilder()
		.setName('autocomplete')
		.setDescription('Returns an autocomplete example!')
		.setDMPermission(false)
		.addStringOption((option) =>
			option
				.setName('color')
				.setDescription('Select a color')
				.setAutocomplete(true)
				.setRequired(true)
		),
	/**
	 *
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("../../Structures/bot")} client
	 */
	execute: async (interaction, client) => {
		const focusedValue = interaction.options.getFocused();
		const choices = ['red', 'blue', 'yellow', 'green'];
		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue)
		);
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice }))
		);
	},
	async execute(interaction, client) {
		const option = interaction.options.getString('color');
		await interaction.reply({
			content: `You told me ${option}`,
		});
	},
};
