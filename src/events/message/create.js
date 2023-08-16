import { resolveColor } from 'discord.js';
import eco from '#schemas/economy.js';

export default {
	name: 'messageCreate',
	/**
	 *
	 * @param {import("discord.js").Message} message
	 * @param {import("#BOT").default} client
	 *
	 */
	async execute(message, client) {
		const { legacyCommands, config } = client;
		const { Prefix, BotOwnerID } = config.env;
		if (message.author.bot) return;
		let msg = message.content.toLowerCase();
		const member = await message.guild.members.fetch(message.author.id);
		const prefixRegex = new RegExp(`^(<@!?${client.user.id}>)\\s*`);
		let str = '';
		if (!Prefix) {
			if (prefixRegex.test(message.content)) {
				str += `I do not support legacy commands due to Discord limitations. Please check out my slash (/) commands!`;
				return message.reply(str);
			} else if (Prefix) {
				if (message.author.id !== BotOwnerID) return null;

				const args = message.content.substring(Prefix.length).split(/ +/);

				const command = legacyCommands.find(
					(cmd) => cmd.name === args[0] || cmd.aliases.includes(args[0])
				);

				if (!command) return null;

				if (command && msg.startsWith(Prefix)) {
					try {
						command.execute(message, args, client);
					} catch (error) {
						console.log(error);
					}
				}
			}
		}
		//Economy System
		let userData = await eco.findOne({
			userID: message.author.id,
		});
		try {
			if (!userData) {
				await new eco({
					userID: message.author.id,
					profiles: [
						{
							guildID: message.guild.id,
							guildName: message.guild.name,
							userName: message.author.username,
							embedColor: resolveColor('Random'),
							wallet: 0,
							bank: 0,
						},
					],
				}).save();
			} else {
				const guildProfile = userData.profiles.find(
					(x) => x.guildID === message.guild.id
				);
				if (!guildProfile) {
					await userData.updateOne(
						{
							$push: {
								profiles: {
									guildID: message.guild.id,
									guildName: message.guild.name,
									userName: message.author.username,
									embedColor: resolveColor('Random'),
									wallet: 0,
									bank: 0,
								},
							},
						},
						{ upsert: true }
					);
				}
			}

			if (!msg.startsWith(Prefix)) {
				const currencyToAdd = Math.floor(Math.random() * 50) + 1;
				const guildProfile = userData.profiles.find(
					(x) => x.guildID === message.guild.id
				);
				if (guildProfile)
					await eco.updateOne(
						{
							userID: message.author.id,
							'profiles.guildID': message.guild.id,
						},
						{ $inc: { 'profiles.$.wallet': currencyToAdd } }
					);
			}
		} catch (error) {
			console.log(error);
		}
	},
};
