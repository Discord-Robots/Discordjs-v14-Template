import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import ms from 'ms';

export default {
	category: 'util',
	cooldown: [1, 'sec'],
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Returns my ping.')
		.setDMPermission(false),
	/**
	 *
	 * @param {import("../../Structures/bot")} client
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction, client) => {
		const msg = await interaction.deferReply({
			fetchReply: true,
		});
		const embed = new EmbedBuilder({
			title: `Bot and API Latency`,
			description: `Here you can see the Bot's and the API latency.`,
			color: client.colors.green,
			fields: [
				{
					name: `Bot Latency`,
					value: `${ms(msg.createdTimestamp - interaction.createdTimestamp, {
						long: true,
					})}`,
					inline: true,
				},
				{
					name: `API Latency`,
					value: `${ms(client.ws.ping, { long: true })}`,
					inline: true,
				},
			],
		});

		await interaction.editReply({
			embeds: [embed],
		});
	},
};
