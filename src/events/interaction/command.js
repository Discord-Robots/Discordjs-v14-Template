import { InteractionType, EmbedBuilder } from 'discord.js';
const { Connect } = process.env;

export default {
	name: 'interactionCreate',
	/**
	 *
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("../../Structures/bot")} client
	 */
	async execute(interaction, client) {
		const { commands, utils } = client;
		if (interaction.isChatInputCommand()) {
			const command = commands.get(interaction.commandName);
			if (!command) return;

			try {
				if (command.owner && utils.checkOwner(interaction.user.id)) {
					return interaction.reply({
						embeds: [
							new EmbedBuilder()
								.setDescription(
									`\\📛 **Error:** \\📛\n You cannot use that command as it is only available to my owner!`
								)
								.setColor('Red'),
						],
						ephemeral: true,
					});
				}

				if (!Connect && command.dbRequired) {
					return await interaction.reply({
						content: `This command is unavailable due to having no database setup.`,
						ephemeral: true,
					});
				}
				client.cool();
				await command.execute(interaction, client);
			} catch (error) {
				console.log(error);
				await interaction.reply({
					content:
						'Something went wrong while executing this command, please contact my developer!',
					ephemeral: true,
				});
			}
		} else if (
			interaction.type == InteractionType.ApplicationCommandAutocomplete
		) {
			const auto = commands.get(interaction.commandName);
			if (!auto) return;

			try {
				await auto.autocomplete(interaction, client);
			} catch (error) {
				console.log(error);
				await interaction.reply({
					content: 'Something went wrong...',
					ephemeral: true,
				});
			}
		}
	},
};
