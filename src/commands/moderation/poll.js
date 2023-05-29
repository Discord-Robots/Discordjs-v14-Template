import {
	ChannelType,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from 'discord.js';

export default {
	category: 'moderation',
	cooldown: [],
	dbRequired: true,
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Sends a poll with default reactions.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addChannelOption((channel) =>
			channel
				.setName('channel')
				.setDescription('Select the channel to send the pol to!')
				.addChannelTypes(
					ChannelType.GuildText,
					ChannelType.AnnouncementThread,
					ChannelType.GuildAnnouncement
				)
				.setRequired(true)
		),
	/**
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async execute(interaction, client) {},
};
