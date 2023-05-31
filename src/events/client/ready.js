import {
	pickPresence,
	handleCommands,
	handleComponents,
	handleLegacyCommands,
	dbConnect,
} from '#handlers';
import blockedGuids from '#schemas/blocked.js';
import { Events } from 'discord.js';
import chalk from 'chalk';

export default {
	name: Events.ClientReady,
	/**
	 *
	 * @param {import("#BOT").default} client
	 */
	async execute(client) {
		const { commandArray, config, developerArray } = client;
		const { Connect, DevGuild, Prefix } = config.env;
		await console.log(chalk.yellowBright(`[CLIENT] - Logging into Discord...`));
		if (Prefix) handleLegacyCommands();
		await console.log(
			chalk.yellowBright(
				'[APPLICATION] - Started refreshing application (/) commands.'
			)
		);
		await handleCommands();
		await console.log(
			chalk.greenBright(
				'[APPLICATION] - Successfully reloaded application (/) commands.'
			)
		);
		await handleComponents();
		await client.guilds.cache.get(DevGuild).commands.set(developerArray);
		await client.application.commands.set(commandArray);
		console.log(chalk.greenBright(`[CLIENT] - Logged into Discord!`));
		await dbConnect(client);
		pickPresence();
		if (Connect) {
			let db = await blockedGuids.findOne({ client_id: client.user.id });
			if (!db) {
				await new blockedGuids({
					client_id: client.user.id,
					guilds: [],
				}).save();
			}
		}
	},
};
