import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
	category: 'owner',
	cooldown: [1, 'sec'],
	owner: true,
	data: new SlashCommandBuilder()
		.setName('servers')
		.setDescription('List of servers the bot is in.')
		.setDMPermission(true)
		.addStringOption((options) =>
			options
				.setName('serverid')
				.setDescription('Get info about a specific server by id.')
		),
	/**
	 *
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 * @returns
	 */
	execute: async (interaction, client) => {
		let gid = interaction.options.getString('serverid');
		let Guild = client.guilds.cache.get(gid);

		if (Guild) {
			const name = Guild.name;
			const ID = Guild.id;
			const ownerTag = Guild.members.cache.get(Guild.ownerId).user.tag;
			const ownerID = Guild.ownerId;
			const mCount = Guild.members.cache.filter(
				(m) => m.user.bot === false
			).size;
			const bCount = Guild.members.cache.filter(
				(m) => m.user.bot === true
			).size;
			// @ts-ignore
			const date = `<t:${Math.floor(Guild.createdAt / 1000) + 3600}:D>`;
			let comOp;
			if (Guild.features.includes('COMMUNITY')) {
				comOp = true;
			} else comOp = false;

			const info = new EmbedBuilder({
				title: name,
				fields: [
					{ name: `Guild ID`, value: `${ID}`, inline: true },
					{ name: `Community?`, value: `${comOp}`, inline: true },
					{ name: `Guild Created:`, value: `${date}`, inline: true },
					{ name: `Guild Owner`, value: `${ownerTag}`, inline: true },
					{ name: `Guild Owner ID`, value: `${ownerID}`, inline: true },
					{ name: `\u200b`, value: `\u200b`, inline: true },
					{ name: `Member Count`, value: `${mCount}`, inline: true },
					{ name: `Bot Count`, value: `${bCount}`, inline: true },
					{ name: `\u200b`, value: `\u200b`, inline: true },
				],
				footer: {
					text: client.user.username,
					iconURL: client.user.avatarURL(),
				},
			});
			if (Guild.banner) info.setImage(Guild.bannerURL());
			if (Guild.icon) info.setThumbnail(`${Guild.iconURL()}`);
			return await interaction.reply({ embeds: [info], ephemeral: true });
		} else {
			let d = '';
			client.guilds.cache.forEach(
				(guild) => (d += `${guild.name} (${guild.id})` + '\n')
			);
			const embed2 = new EmbedBuilder({
				title: 'Here is a list of servers that I am in!',
				description: d,
			});
			return await interaction.reply({ embeds: [embed2], ephemeral: true });
		}
	},
};
