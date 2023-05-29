import { EmbedBuilder, TextChannel } from 'discord.js';
import db from '#schemas/guild.js';

export default {
	data: {
		id: 'announce-modal',
	},
	/**
	 *
	 * @param {import("discord.js").ModalSubmitInteraction} interaction
	 * @param {import("#BOT").default} client
	 * @returns
	 */
	async execute(interaction, client) {
		const guildDB = await db.findOne({ guildID: interaction.guildId });
		const dbChan = guildDB?.announcementsChannel;
		const { guild, fields } = interaction;
		const channel = guild?.channels.cache.get(dbChan);

		const messageInput = fields.getTextInputValue('message-input');

		const Embed = new EmbedBuilder()
			.setColor(client.colors.green)
			.setTitle('New Announcement')
			.setThumbnail(guild?.iconURL())
			.setDescription(messageInput)
			.setTimestamp();

		await interaction.reply({
			content: `✅ Announcement is now live in <#${dbChan}>.`,
			ephemeral: true,
		});

		// @ts-ignore
		channel?.send({ embeds: [Embed] }).then(async (msg) => {
			await msg.react('⬆️');
			await msg.react('⬇️');
		});
	},
};
