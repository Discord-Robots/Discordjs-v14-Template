const { Prefix, BotOwnerID } = process.env;
import eco from '../../models/economy.js';

export default {
	name: 'messageCreate',
	/**
	 *
	 * @param {import("discord.js").Message} message
	 * @param {import("#BOT").default} client
	 *
	 */
	async execute(message, client) {
		const { legacyCommands } = client;
		if (message.author.bot) return;
		let msg = message.content.toLowerCase();

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
		} else if (Prefix || !Prefix) {
			//Economy System
			let profileData = await eco.findOne({
				guildID: message.guildId,
				userID: message.author.id,
			});
			if (!profileData) {
				await new eco({
					userID: message.author.id,
					guildID: message.guild.id,
					guildName: message.guild.name,
					userName: message.author.username,
					wallet: 0,
					bank: 0,
				}).save();
			}
			try {
				if (!msg.startsWith(Prefix)) {
					const currencyToAdd = Math.floor(Math.random() * 50) + 1;
					await eco.findOneAndUpdate(
						{
							userID: message.author.id,
							guildID: message.guild.id,
						},
						{
							$inc: {
								wallet: currencyToAdd,
							},
						},
						{
							upsert: true,
						}
					);
				}
			} catch (error) {
				console.log(error);
			}
		}
	},
};
