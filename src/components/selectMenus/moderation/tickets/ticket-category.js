import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	CategoryChannel,
	ChannelType,
	EmbedBuilder,
	ModalBuilder,
	PermissionFlagsBits,
	StringSelectMenuInteraction,
	TextChannel,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';
import ticketSchema from '#schemas/tickets.js';

export default {
	data: {
		id: `ticket-category`,
	},
	/**
	 * @param {StringSelectMenuInteraction} interaction
	 * @param {import('#BOT').default} client
	 */
	async execute(interaction, client) {
		const [cat] = interaction.values;
		const { pings, menu } = client.config.TicketConfig;
		const category = cat;
		/**
		 * @type {string[]}
		 */
		let ids = [];
		for (const [cat, ping] of Object.entries(pings)) {
			if (cat === category) {
				ping.forEach((x) => ids.push(client.utils.getId(x)));
			}
		}
		let ticks = await ticketSchema.findOne({ Guild: interaction.guild.id });

		const modal = new ModalBuilder()
			.setCustomId('ticket_modal')
			.setTitle(`${cat} Ticket Creation`);

		const texts = [
			new TextInputBuilder()
				.setCustomId('character_name')
				.setLabel(`What is your characters name?`)
				.setMinLength(3)
				.setMaxLength(25)
				.setRequired(true)
				.setStyle(TextInputStyle.Short),

			new TextInputBuilder()
				.setCustomId('character_cid')
				.setLabel(`What is your characters CID?`)
				.setMinLength(8)
				.setMaxLength(8)
				.setRequired(true)
				.setStyle(TextInputStyle.Short),

			new TextInputBuilder()
				.setCustomId('help')
				.setLabel(`What is it you need help with?`)
				.setMinLength(15)
				.setMaxLength(250)
				.setRequired(true)
				.setStyle(TextInputStyle.Paragraph),

			new TextInputBuilder()
				.setCustomId('proof')
				.setLabel(`Do you have any proof of this?`)
				.setMinLength(2)
				.setMaxLength(3)
				.setRequired(true)
				.setStyle(TextInputStyle.Short),
		];

		texts.forEach((text) => {
			modal.addComponents(
				new ActionRowBuilder({
					components: [text],
				})
			);
		});

		await interaction.showModal(modal);

		//Modal Submit Handling
		await interaction
			.awaitModalSubmit({
				time: 5 * 60 * 1000,
			})
			.then(async (modalSubmit) => {
				if (!modalSubmit) console.log('modal cancelled');
				const in_city_name =
					modalSubmit.fields.getTextInputValue('character_name');
				const character_cid =
					modalSubmit.fields.getTextInputValue('character_cid');
				const help = modalSubmit.fields.getTextInputValue('help');
				const proof = modalSubmit.fields.getTextInputValue('proof');

				const embed = new EmbedBuilder()
					.setTitle(`${modalSubmit.user.username}'s Ticket Request`)
					.setDescription(help)
					.setTimestamp()
					.setFooter({
						iconURL: client.user.displayAvatarURL(),
						text: client.user.tag,
					})
					.addFields(
						{
							name: 'Character Name: ',
							value: in_city_name,
							inline: true,
						},
						{
							name: 'Character ID: ',
							value: character_cid,
							inline: true,
						},
						{
							name: 'Proof?: ',
							value: proof,
							inline: true,
						}
					);

				/**
				 * @type {TextChannel}
				 */
				// @ts-ignore
				const channel = await interaction.guild.channels.fetch(
					ticks.TicketChannel
				);
				/**
				 * @type {CategoryChannel}
				 */
				// @ts-ignore
				const categoryChannel = await interaction.guild.channels.fetch(
					ticks.Category
				);
				let catIndex = ticks.Tickets.findIndex((x) => x.cat === cat);
				let catCounter = ticks.Tickets[catIndex].count + 1;
				ids.forEach(async (id) => {
					categoryChannel.children
						.create({
							name: `${cat} Ticket-${catCounter}`,
							type: ChannelType.GuildText,
							permissionOverwrites: [
								{
									id: interaction.guild.id,
									deny: [PermissionFlagsBits.ViewChannel],
								},
								{
									id: interaction.user.id,
									allow: [
										PermissionFlagsBits.ViewChannel,
										PermissionFlagsBits.SendMessages,
										PermissionFlagsBits.AttachFiles,
										PermissionFlagsBits.ReadMessageHistory,
									],
								},
								{
									id,
									allow: [
										PermissionFlagsBits.ViewChannel,
										PermissionFlagsBits.ReadMessageHistory,
									],
									deny: [
										PermissionFlagsBits.SendMessages,
										PermissionFlagsBits.AttachFiles,
									],
								},
							],
						})
						.then(async (chan) => {
							/**
							 * @type {ActionRowBuilder<ButtonBuilder>[]}
							 */
							const components = [
								new ActionRowBuilder({
									components: [
										new ButtonBuilder({
											custom_id: 'ticket-close',
											emoji: '📪',
											label: 'Close',
											style: ButtonStyle['Danger'],
										}),
										new ButtonBuilder({
											custom_id: 'ticket-claim',
											emoji: '🛄',
											label: 'Claim',
											style: ButtonStyle['Success'],
										}),
									],
								}),
							];
							await chan.send({
								content: `${
									// @ts-ignore
									pings[cat] ??
									"No one was specified for me to ping...Who's gonna help?"
								}\n<@${
									interaction.user.id
								}> Needs some help in ${cat} category.`,
								embeds: [embed],
								components,
							});
						})
						.finally(async () => {
							await ticks.updateOne(
								{ $inc: { 'Tickets.$[elem].count': 1 } },
								{ arrayFilters: [{ 'elem.cat': cat }] }
							);
						});
					await modalSubmit
						.reply({
							content: `${modalSubmit.user.username} Your ticket has successfully been created. Staff will get back to you within 2-4 hours. Please DONT ping staff.`,
							ephemeral: true,
						})
						.then(async () => {
							await interaction.message.edit({
								components: [menu],
							});
						});
				});
			});
	},
};
