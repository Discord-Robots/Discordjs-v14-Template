// @ts-nocheck
import {
	ChannelType,
	EmbedBuilder,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from 'discord.js';
import ticketSchema from '#schemas/tickets.js';

export default {
	category: 'moderation',
	cooldown: [],
	dbRequired: true,
	data: new SlashCommandBuilder()
		.setName('ticket_setup')
		.setDescription(`This sets up the ticket message and system!`)
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription(`The channel you want to send the ticket message in`)
				.addChannelTypes(ChannelType.GuildText)
		)
		.addChannelOption((option) =>
			option
				.setName('category')
				.setDescription(`The channel you want ticket to be sent in`)
				.addChannelTypes(ChannelType.GuildCategory)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	/**
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async execute(interaction, client) {
		await interaction.deferReply({ fetchReply: true, ephemeral: true });
		const channel = interaction.options.getChannel('channel');
		const category = interaction.options.getChannel('category');

		let tick = await ticketSchema.findOne({
			Guild: interaction.guild.id,
		});
		if (!tick) {
			await new ticketSchema({
				Guild: interaction.guild.id,
				Category: category.id,
				TicketChannel: channel.id,
				Tickets: [
					{
						cat: 'General',
						count: 0,
					},
					{ cat: 'Bug Report', count: 0 },
					{ cat: 'Staff Report', count: 0 },
					{ cat: 'Ban Appeal', count: 0 },
				],
			}).save();
		} else {
			let chan = await interaction.guild.channels.fetch(channel.id);
			let msg = (await chan.messages.fetch()).first();
			if (!msg) {
				await ticketSchema.deleteOne({ Guild: interaction.guild.id });
				return await interaction.editReply({
					content: 'I could not find ticket message! Please try again!',
				});
			} else {
				if (msg.author.id !== client.user.id) {
					await ticketSchema.deleteOne({ Guild: interaction.guild.id });
					await msg.delete();
					return await interaction.editReply({
						content: 'I could not find ticket message! Please try again!',
					});
				}
				if (msg.components[0].components[0].customId === 'ticket-category')
					return await interaction.editReply({
						content: `You already have a ticket message setup. ${msg.url}`,
					});
			}
		}

		const embed = new EmbedBuilder()
			.setColor('Blue')
			.setTitle(`Ticket System`)
			.setDescription(
				`If you have a problem. Open a ticket and talk to a staff member!`
			)
			.setFooter({ text: `${interaction.guild.name} tickets` });

		await channel.send({
			embeds: [embed],
			components: [client.config.TicketConfig.menu],
			content:
				'Please use the drop down box to find the right ticket section you need.',
		});
		await interaction.editReply({
			content: `Your ticket system has been setup in ${channel}`,
		});
	},
};
