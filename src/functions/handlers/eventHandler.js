import { client } from '#client';

export async function handleEvents() {
	const { events } = client;
	client.removeAllListeners();
	let eventFiles = await client.utils.loadFiles('./src/events');
	for (const file of eventFiles) {
		const eventFile = await import(file);
		const event = eventFile.default;
		const execute = (/** @type {any[]} */ ...args) =>
			event.execute(...args, client);
		if (event.once) client.once(event.name, execute);
		else client.on(event.name, execute);
		events.set(event.name, execute);
	}
}
