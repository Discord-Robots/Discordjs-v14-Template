// @ts-nocheck
import {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
	resolveColor,
} from 'discord.js';
import fs from 'fs';
import path from 'path';
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const { version, dependencies } = packageJson;
import ms from 'ms';
import os from 'os';
import moment from 'moment';
const { utc } = moment;

export default {
	developer: true,
	category: 'util',
	cooldown: [20, 'sec'],
	data: new SlashCommandBuilder()
		.setName('bot-info')
		.setDescription('Returns Bot OS info.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	/**
	 *
	 * @param {import("#BOT").default} client
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction, client) => {
		const core = os.cpus()[0];
		const embed = new EmbedBuilder()
			.setThumbnail(client.user?.displayAvatarURL())
			.setColor(resolveColor(interaction.guild?.members.me?.displayHexColor))
			.addFields({
				name: 'General',
				value: `**❯ Client:** ${client.user?.tag} (${client.user?.id})
                **❯ Commands:** ${client.application.commands.cache.size}
                **❯ Servers:** ${client.guilds.cache.size.toLocaleString()} 
                **❯ Users:** ${client.users.cache.filter((m) => !m.bot).size}
                **❯ Channels:** ${client.channels.cache.size.toLocaleString()}
                **❯ Creation Date:** ${utc(
									client.user?.createdTimestamp
								).format('Do MMMM YYYY HH:mm:ss')}
                **❯ Node.js:** ${process.version}
                **❯ Version:** v${version}
                **❯ Discord.js:** v${dependencies['discord.js']}`,
			})
			.addFields({
				name: 'System',
				value: `**❯ Platform:** ${process.platform}
                **❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}
                **❯ CPU:**
                \u3000 Cores: ${os.cpus().length}
                \u3000 Model: ${core.model}
                \u3000 Speed: ${core.speed}MHz
                **❯ Memory:**
                \u3000 Total: ${client.utils.formatBytes(
									process.memoryUsage().heapTotal
								)}
                \u3000 Used: ${client.utils.formatBytes(
									process.memoryUsage().heapUsed
								)}`,
			})
			.setTimestamp();

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
