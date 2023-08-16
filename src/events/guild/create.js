import { EmbedBuilder, AuditLogEvent, TextChannel } from 'discord.js';
import guildSchema from '#schemas/guild.js';
import blockedGuids from '#schemas/blocked.js';

export default {
	name: 'guildCreate',
	/**
	 *
	 * @param {import("discord.js").Guild} guild
	 * @param {import("#BOT").default} client
	 */
	async execute(guild, client) {
		const { Connect, DevChannel, DevGuild, Prefix } = client.config.env;
		console.log(`I joined a new guild: ${guild.name}`);
		const Dev = await client.guilds.fetch(DevGuild);
		/**
		 * @type {TextChannel}
		 */
		// @ts-ignore
		const devChan = await Dev.channels.fetch(DevChannel);
		const ownerTag = guild.members.cache.get(guild.ownerId)?.user.username;
		const userCount = guild.members.cache.filter((m) => !m.user.bot).size;
		const botCount = guild.members.cache.filter((m) => m.user.bot).size;
		const created = new EmbedBuilder({
			title: `Joined New Guild!`,
			description: `Here are the details of the guild that I joined:`,
			fields: [
				{ name: `Guild Name:`, value: `${guild.name}`, inline: true },
				{ name: `Guild ID:`, value: `${guild.id}`, inline: true },
				{ name: `Boost Level:`, value: `${guild.premiumTier}`, inline: true },
				{ name: `Guild Owner:`, value: `${ownerTag}`, inline: true },
				{ name: `Guild Owner ID:`, value: `${guild.ownerId}`, inline: true },
				{ name: '\u200b', value: '\u200b', inline: true },
				{ name: `Member Count:`, value: `${userCount}`, inline: true },
				{ name: `Bot Count:`, value: `${botCount}`, inline: true },
				{ name: '\u200b', value: '\u200b', inline: true },
			],
			footer: {
				text: `${client.user?.tag}`,
				icon_url: `${client.user?.displayAvatarURL()}`,
			},
		}).setTimestamp();
		if (guild.banner) created.setImage(guild.bannerURL());
		if (guild.icon) created.setThumbnail(`${guild.iconURL()}`);

		if (Connect) {
			let blocked = await blockedGuids.findOne({ client_id: client.user?.id });
			let fetched = blocked?.guilds.find((x) => x.guildID === guild.id);
			if (blocked && fetched) {
				let botAdd = (
					await guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.BotAdd })
				).entries.first();
				botAdd?.executor?.send({
					content: `The guild: \`${guild.name}\` that you have invited me to has been blocked from using my interactions. I will now leave the server. If you wish to re-add me, please check with your server owner for instructions on an appeal.`,
				});
				created.addFields({
					name: `Blocked Guild:`,
					value: `Guild was already blocked from using interactions so I left.`,
				});
				await client.utils.wait(5000);
				await guild.leave();
			} else {
				let doc = await guildSchema.findOne({ guildID: guild.id });
				if (!doc) {
					await guildSchema
						.create({
							guildID: guild.id,
							guildName: guild.name,
							guildOwnerID: guild.ownerId,
							guildOwner: ownerTag,
							prefix: Prefix,
						})
						.then((m) => m.save());
				}
				if (devChan) {
					devChan?.send({ embeds: [created] });
				} else guild?.systemChannel?.send({ embeds: [created] });
			}
		} else {
			if (devChan) {
				devChan?.send({ embeds: [created] });
			} else Dev?.systemChannel?.send({ embeds: [created] });
		}
	},
};
