/**
 *
 * @param {import("../../Structures/bot")} client
 */
export default (client) => {
	const { events, rds } = client;
	client.removeAllListeners();
	client.handleEvents = async () => {
		const eventFolders = rds(`./src/events`);
		for (const folder of eventFolders) {
			const eventFiles = rds(`./src/events/${folder}`).filter((file) =>
				file.endsWith('.js')
			);
			for (const file of eventFiles) {
				const event = require(`../../events/${folder}/${file}`);
				const execute = (...args) => event.execute(...args, client);
				if (event.once) client.once(event.name, execute);
				else client.on(event.name, execute);
				events.set(event.name, execute);
			}
		}
	};
};
