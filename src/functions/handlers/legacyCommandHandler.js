import { client } from '#client';

export async function handleLegacyCommands() {
	const { aliases, legacyArray, legacyCommands, rds } = client;

	const commandFolders = rds('./src/legacyCommands');
	for (const folder of commandFolders) {
		const commandFiles = rds(`./src/legacyCommands/${folder}`).filter((file) =>
			file.endsWith('.js')
		);

		for (const file of commandFiles) {
			const command = await import(`../../legacyCommands/${folder}/${file}`);
			const dcmd = command.default;
			legacyArray.push(dcmd);
			legacyCommands.set(dcmd.name, dcmd);

			if (dcmd.aliases && Array.isArray(dcmd.aliases)) {
				dcmd.aliases.forEach((/** @type {string} */ alias) =>
					aliases.set(alias, dcmd.name)
				);
			}
		}
	}
}
