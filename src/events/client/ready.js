import { pickPresence } from '#handlers';
import blockedGuids from '#schemas/blocked.js';
import { Events } from 'discord.js';
import {
	handleCommands,
	handleComponents,
	handleLegacyCommands,
} from '#handlers';

export default {
	name: Events.ClientReady,
	/**
	 *
	 * @param {import("#BOT").default} client
	 */
	async execute(client) {
		await client.utils.logger();
		await handleCommands();
		await handleComponents();
		await client.guilds.cache
			.get(client.config.env.DevGuild)
			.commands.set(client.developerArray);
		await client.application.commands.set(client.commandArray);
		if (client.config.env.Prefix) handleLegacyCommands();

		pickPresence();
		const { Connect } = client.config.env;
		if (Connect) {
			let db = await blockedGuids.findOne({ client_id: client.user.id });
			if (!db) {
				new blockedGuids({
					client_id: client.user.id,
					guilds: [],
				}).save();
			}
		}
	},
};
