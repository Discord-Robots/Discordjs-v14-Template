import { welcomeCreate } from '../../Structures/welcomer.js';

export default {
	name: 'guildMemberAdd',
	/**
	 *
	 * @param {import("discord.js").GuildMember} member
	 * @param {import("#BOT").default} client
	 */
	async execute(member, client) {
		if (member.user.bot) return;
		const { guild } = member;

		const memCount = member.guild.members.cache.filter(
			(m) => m.user.bot === false
		).size;
		const botCount = member.guild.members.cache.filter(
			(m) => m.user.bot === true
		).size;
		const totalCount = member.guild.memberCount;

		const welcomeChannel = member.guild.systemChannel;
		if (welcomeChannel)
			welcomeCreate(member, guild.name, memCount, welcomeChannel);
	},
};
