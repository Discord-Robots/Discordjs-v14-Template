import { EmbedBuilder } from 'discord.js';
import db from '../../../../models/guild';

export default {
	data: {
		id: 'announce-modal',
	},
	/**
	 *
	 * @param {import("discord.js").ModalSubmitInteraction} interaction
	 * @param {import("../../../../Structures/bot")} client
	 * @returns
	 */
	async execute(interaction, client) {
		const guildDB = await db.findOne({ guildID: interaction.guildId });
		const dbChan = guildDB.announcementsChannel;
		const { guild, fields } = interaction;
		const channel = guild.channels.cache.get(dbChan);

		const messageInput = fields.getTextInputValue('message-input');

		const Embed = new EmbedBuilder()
			.setColor(colors.green)
			.setTitle('New Announcement')
			.setThumbnail(guild.iconURL())
			.setDescription(messageInput)
			.setTimestamp();

		await interaction.reply({
			content: `✅ Announcement is now live in <#${dbChan}>.`,
			ephemeral: true,
		});

		channel.sen0d({ embeds: [Embed] }).then(async (msg) => {
			await msg.react('⬆️');
			await msg.react('⬇️');
		});
	},
};
