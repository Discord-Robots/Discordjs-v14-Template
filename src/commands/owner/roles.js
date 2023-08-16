import {
	ActionRowBuilder,
	ChatInputCommandInteraction,
	RoleSelectMenuBuilder,
	SlashCommandBuilder,
} from 'discord.js';

export default {
	category: 'owner',
	cooldown: [10, 'min'],
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Select a role'),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {import('#BOT').default} client
	 */
	execute: async (interaction, client) => {
		await interaction.reply({
			/**
			 * @type {ActionRowBuilder<RoleSelectMenuBuilder>[]}
			 */
			components: [
				new ActionRowBuilder({
					components: [
						new RoleSelectMenuBuilder({
							custom_id: 'role-menu',
							placeholder: 'Select a role',
						}),
					],
				}),
			],
		});
	},
};
