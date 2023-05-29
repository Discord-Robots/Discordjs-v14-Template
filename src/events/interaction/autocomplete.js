import { Events } from 'discord.js';

export default {
	name: Events.InteractionCreate,
	/**
	 *
	 * @param {import("discord.js").AutocompleteInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async execute(interaction, client) {
		if (interaction.isAutocomplete()) {
			const { commands } = client;
			const auto = commands.get(interaction.commandName).default;
			if (!auto) return;

			try {
				await auto.autocomplete(interaction, client);
			} catch (error) {
				console.log(error);
				await interaction.respond([
					{ name: 'Something went wrong...', value: `` },
				]);
			}
		}
	},
};
