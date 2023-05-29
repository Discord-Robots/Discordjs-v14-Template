import { EmbedBuilder } from 'discord.js';
import guildSchema from '#schemas/guild.js';

export default {
	name: 'guildDelete',
	/**
	 *
	 * @param {import("discord.js").Guild} guild
	 * @param {import('#BOT').default} client
	 */
	async execute(guild, client) {
		console.log(`I've been removed from guild: ${guild.name}`);
		const { Connect, DevChannel, DevGuild } = client.config.env;
		const devChan = client.channels.cache.get(DevChannel);
		const devGuild = client.guilds.cache.get(DevGuild);
		const removed = new EmbedBuilder({
			title: `Removal from Guild`,
			description: `I have been removed from guild: \n${guild.name} (${guild.id}).`,
			footer: {
				text: `${client.user?.tag}`,
				iconURL: `${client.user?.displayAvatarURL()}`,
			},
		}).setTimestamp();
		if (guild.icon) removed.setThumbnail(`${guild.iconURL()}`);

		if (guild === devGuild) return;

		devGuild?.systemChannel?.send({ embeds: [removed] });
		let doc = await guildSchema.findOne({ guildID: guild.id });
		if (doc) return await doc.deleteOne();
	},
};
