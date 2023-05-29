import {
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
} from 'discord.js';
import doc from '#schemas/blocked.js';

export default {
	owner: true,
	dbRequired: true,
	category: 'owner',
	cooldown: [1, 'sec'],
	data: new SlashCommandBuilder()
		.setName('block')
		.setDescription('Stops a specific server from using the bot.')
		.setDMPermission(true)
		.addStringOption((id) =>
			id
				.setName('guildid')
				.setDescription(
					'Specify the guild id of which you would like to block.'
				)
		),

	/**
	 *
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	execute: async (interaction, client) => {
		const { options } = interaction;
		let gid = options.getString('guildid');
		let db = await doc.findOne({ client_id: client.user.id });
		let fetched = db.guilds.find((x) => x.guildID === gid);
		if (!fetched)
			return await interaction.reply({
				content: 'That guild id does not exist in my database.',
				ephemeral: true,
			});
		if (gid) {
			if (fetched) {
				/**
				 * @type {ActionRowBuilder<ButtonBuilder>[]}
				 */
				let row = [
					new ActionRowBuilder({
						type: 1,
						components: [
							new ButtonBuilder({
								customId: 'unblock-yes',
								emoji: '✅',
								style: 1,
								type: 2,
							}),
							new ButtonBuilder({
								customId: 'unblock-no',
								emoji: '❌',
								style: 1,
								type: 2,
							}),
						],
					}),
				];
				return await interaction.reply({
					embeds: [
						new EmbedBuilder({
							description:
								'That guild is already blocked. Would you like to unblock it?',
							footer: { text: gid },
						}),
					],
					components: row,
					ephemeral: true,
				});
			}
		} else {
			/**
			 * @type {ActionRowBuilder<TextInputBuilder>[]}
			 */
			let rows = [
				new ActionRowBuilder({
					type: 1,
					components: [
						new TextInputBuilder({
							custom_id: 'block_gid',
							label: 'Guild ID',
							placeholder: 'Give me the guild id that should be blocked.',
							style: 1,
							type: 4,
						}),
					],
				}),
				new ActionRowBuilder({
					type: 1,
					components: [
						new TextInputBuilder({
							custom_id: 'reason_for_block',
							label: 'Reason for this block',
							placeholder: 'Give me a reason for blocking this guild.',
							style: 2,
							type: 4,
						}),
					],
				}),
			];
			await interaction.showModal(
				new ModalBuilder({
					custom_id: 'block-modal',
					title: 'Block New Guild',
					components: rows,
				})
			);
		}
	},
};
