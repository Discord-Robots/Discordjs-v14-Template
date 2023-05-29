import { SlashCommandBuilder, GuildMember, EmbedBuilder } from 'discord.js';
import Eco from '#schemas/economy.js';
import Guild from '#schemas/guild.js';

export default {
	dbRequired: true,
	category: 'economy',
	cooldown: [2, 'min'],
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Check a users balance.')
		.setDMPermission(false)
		.addUserOption((user) =>
			user
				.setName('user')
				.setDescription('Select a user to get balance. (skip for yourself)')
				.setRequired(true)
		),
	/**
	 *
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 * @returns
	 */
	execute: async (interaction, client) => {
		let guild = await Guild.findOne({
			guildID: interaction.guildId,
		});
		if (interaction.channelId !== guild?.botCommandsChannel)
			return interaction.reply({
				content: `Please run this command in this guilds designated bot commands channel!`,
				ephemeral: true,
			});
		const { currency, bank, wallet } = client.config.economy;
		const user = interaction.options.getUser('user', true);
		/**
		 * @type {GuildMember}
		 */
		const member =
			interaction.guild?.members?.cache.get(user.id) ||
			interaction.guild?.members?.cache.get(interaction.user.id);
		const intMember = interaction.guild?.members?.cache.get(
			interaction.user.id
		);
		if (member.user.bot)
			return interaction.reply({
				content: `${member.user.username} cannot have a balance because they are a bot!`,
			});
		let profileData = await Eco.findOne({
			userID: member.id,
			guildID: interaction.guildId,
		});
		if (profileData) {
			const __ =
				profileData?.wallet < 100
					? `${member} should chat more!`
					: `${member} enjoys chatting in this server!`;
			const Balance = new EmbedBuilder({
				author: {
					name: `${currency} Balance for ${member}:`,
					icon_url: member.displayAvatarURL(),
				},
				fields: [
					{
						name: `${wallet} Wallet:`,
						value: `${profileData.wallet}`,
						inline: true,
					},
					{
						name: `${bank}, Bank:`,
						value: `${profileData.bank}`,
						inline: true,
					},
					{ name: __, value: '\u200b' },
				],
				footer: {
					text: `Requested by: ${interaction.user.username}`,
					icon_url: intMember?.displayAvatarURL(),
				},
			});
			return await interaction.reply({
				embeds: [Balance],
			});
		}
		return interaction.reply({
			content: `${member.user.username} has no balance!`,
		});
	},
};
