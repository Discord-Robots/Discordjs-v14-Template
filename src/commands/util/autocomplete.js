import { SlashCommandBuilder } from 'discord.js';

export default {
	category: 'util',
	cooldown: [1, 'sec'],
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
	 * @param {import("discord.js").AutocompleteInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async autocomplete(interaction, client) {
		const focusedValue = interaction.options.getFocused();
		const choices = ['red', 'blue', 'yellow', 'green'];
		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue)
		);
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice }))
		);
	},
	/**
	 *
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async execute(interaction, client) {
		const option = interaction.options.getString('color');
		if (!option)
			return await interaction.reply({
				content: `I did not comprehend your choice.`,
				ephemeral: true,
			});
		await interaction.reply({
			content: `If I had to take a guess, I'd say your favorite color is ${option}.`,
		});
	},
};
