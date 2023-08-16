import { EmbedBuilder } from 'discord.js';
import { cooldown } from '#handlers';

export default {
	name: 'interactionCreate',
	/**
	 *
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async execute(interaction, client) {
		const { commands, config, utils } = client;
		const { Connect } = config.env;
		if (interaction.isChatInputCommand()) {
			const commandFile = commands.get(interaction.commandName);
			const command = commandFile.default;
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

				// if (command.cooldown && Array.isArray(command.cooldown)) {
				// 	await cooldown(command, 'command', interaction);
				// }
				await command.execute(interaction, client);
			} catch (error) {
				console.log(error);
				// await interaction.reply({
				// 	content:
				// 		'Something went wrong while executing this command, please contact my developer!',
				// 	ephemeral: true,
				// });
			}
		}
	},
};
