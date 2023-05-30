export default {
	name: 'test',
	cooldown: 10,
	enabled: true,
	aliases: ['te'],
	description: 'Checks to see if the bot is online.',
	/**
	 *
	 * @param {import("discord.js").Message} message
	 * @param {string} args
	 * @param {import("#BOT").default} client
	 */
	async execute(message, args, client) {
		message.reply('Test command works');
	},
};
