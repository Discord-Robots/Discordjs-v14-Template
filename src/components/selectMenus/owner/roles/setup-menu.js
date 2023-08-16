import { RoleSelectMenuInteraction } from 'discord.js';

export default {
	data: {
		id: 'role-menu',
	},

	/**
	 * @param {RoleSelectMenuInteraction} interaction
	 * @param {import('#BOT').default} client
	 */
	async execute(interaction, client) {
		const member = await interaction.guild.members.fetch({
			// withPresences: true,
			user: interaction.user.id,
			// force: true,
		});
		console.log(member);
		await interaction.reply({
			embeds: [
				{
					description: `\`\`\`User: ${JSON.stringify(
						member.user,
						null,
						4
					)}\`\`\``,
					fields: [
						{
							name: 'User Flags:',
							value: `${member.user.flags.toArray().join(', ')}`,
						},
					],
				},
			],
		});
	},
};
