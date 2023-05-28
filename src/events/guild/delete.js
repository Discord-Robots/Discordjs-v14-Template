import { EmbedBuilder } from 'discord.js';
const { DevChannel, DevGuild } = process.env;

export default {
	name: 'guildDelete',
	/**
	 *
	 * @param {import("discord.js").Guild} guild
	 * @param {import("../../Structures/bot")} client
	 */
	async execute(guild, client) {
		console.log(`I've been removed from guild: ${guild.name}`);
		const devChan = client.channels.cache.get(DevChannel);
		const removed = new EmbedBuilder({
			title: `Removal from Guild`,
			description: `I have been removed from guild: \n${guild.name} (${guild.id}).`,
			footer: {
				text: `${client.user.tag}`,
				iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
			},
		}).setTimestamp();
		if (guild.icon) removed.setThumbnail(`${guild.iconURL({ dynamic: true })}`);

		client.guilds.cache.get(DevGuild).systemChannel.send({ embeds: [removed] });
	},
};
