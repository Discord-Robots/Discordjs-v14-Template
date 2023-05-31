import { client } from '#client';
import chalk from 'chalk';

export async function handleEvents() {
	const { events } = client;
	client.removeAllListeners();
	let eventFiles = await client.utils.loadFiles('./src/events');
	let eventCount = 0;
	for (const file of eventFiles) {
		const eventFile = await import(file);
		const event = eventFile.default;
		if (!event) {
			console.error(
				chalk.italic.bold.redBright(
					`Event: ${file
						.split('/')
						.pop()} does not have a default export. Skipping...`
				)
			);
		}
		if (!event.name || !event.execute) {
			console.error(
				chalk.italic.bold.redBright(
					`Event: ${file
						?.split('/')
						?.pop()
						?.replace(
							'.js',
							''
						)} is missing the 'name' or 'execute' property. Skipping...`
				)
			);
		}

		eventCount++;
		const execute = (/** @type {any[]} */ ...args) =>
			event.execute(...args, client);
		if (event.once) client.once(event.name, execute);
		else client.on(event.name, execute);
		events.set(event.name, execute);
	}
	if (eventCount > 0)
		console.log(chalk.blueBright(`[HANDLER] - Loaded ${eventCount} Event(s)!`));
}
