// @ts-nocheck
import {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
	ChatInputCommandInteraction,
	AutoModerationRuleTriggerType,
	AutoModerationRuleEventType,
	AutoModerationActionType,
} from 'discord.js';

export default {
	category: 'moderation',
	data: new SlashCommandBuilder()
		.setName('automod')
		.setDescription('Setup auto moderation system')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommand((command) =>
			command
				.setName('flagged-words')
				.setDescription('Block profanity, sexual content, and slurs')
		)
		//.addSubcommand(command => command.setName('spam-messages').setDescription('Block messages suspected of spam'))
		.addSubcommand((command) =>
			command
				.setName('keyword')
				.setDescription('Block a given keyword in the server')
				.addStringOption((option) =>
					option
						.setName('word')
						.setDescription('The word you want to block')
						.setRequired(true)
				)
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {import('#BOT').default} client
	 * @returns
	 */
	async execute(interaction, client) {
		const { guild, options, user } = interaction;
		const channel = guild.channels.cache.get(interaction.channelId);
		const sub = options.getSubcommand();
		const member = guild.members.cache.get(user.id);
		try {
			await interaction.deferReply({
				fetchReply: true,
				ephemeral: true,
			});
			switch (sub) {
				case 'flagged-words':
					await interaction.editReply({
						content: 'Loading your automod rule...',
					});
					await guild.autoModerationRules.create({
						name: `${client.user.username}'s AutoModeration Utility`,
						creatorId: member.id,
						triggerType: AutoModerationRuleTriggerType.KeywordPreset,
						eventType: AutoModerationRuleEventType.MessageSend,
						actions: [
							{
								type: AutoModerationActionType.BlockMessage,
								metadata: {
									channel: channel,
									durationSeconds: 10,
									customMessage: `This message was prevented by ${client.user.username}'s AutoModeration Utility.`,
								},
							},
						],
						triggerMetadata: {
							presets: [1, 2, 3],
						},
						enabled: true,
						exemptRoles: [],
						exemptChannels: [],
					});

					const embed = new EmbedBuilder()
						.setColor(0x8711ca)
						.setDescription(
							`Your automod rule has been created. All flagged words will be stopped by ${client.user.username}'s AutoModeration Utility.`
						);

					await interaction.editReply({ content: '', embeds: [embed] });

					break;

				case 'keyword':
					await interaction.editReply({
						content: 'Loading your automod rule...',
					});
					const word = interaction.options.getString('word');
					await guild.autoModerationRules.create({
						name: `${client.user.username}'s AutoModeration Utility`,
						creatorId: member.id,
						triggerType: AutoModerationRuleTriggerType.Keyword,
						eventType: AutoModerationRuleEventType.MessageSend,
						actions: [
							{
								type: AutoModerationActionType.BlockMessage,
								metadata: {
									channel,
									durationSeconds: 10,
									customMessage: `This message was prevented by ${client.user.username}'s AutoModeration Utility.`,
								},
							},
						],
						triggerMetadata: {
							keywordFilter: [word],
						},
						enabled: true,
						exemptRoles: [],
						exemptChannels: [],
					});

					const embed2 = new EmbedBuilder()
						.setColor(0x8711ca)
						.setDescription(
							`Your automod rule has been created. All messages containing ${word} will be deleted by ${client.user.username}'s AutoModeration Utility.`
						);

					await interaction.editReply({ content: '', embeds: [embed2] });
					break;
			}
		} catch (error) {
			console.error(error);
			await interaction.editReply({
				content: 'An error occurred while setting up the automod rule.',
			});
		}
	},
};
