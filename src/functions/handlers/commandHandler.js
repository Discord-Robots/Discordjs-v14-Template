import { client } from '#client';

export async function handleCommands() {
	const { commands, commandArray, developerArray, utils } = client;
	const commandFiles = await utils.loadFiles('./src/commands');
	for (const file of commandFiles) {
		const command = await import(file);
		const dcmd = command.default;
		if (!dcmd) return;
		if (dcmd.developer === true) {
			developerArray.push(dcmd.data.toJSON());
		} else if (!dcmd.developer || dcmd.developer === false) {
			commandArray.push(dcmd.data.toJSON());
		}
		commands.set(dcmd.data.name, command);
	}
}
