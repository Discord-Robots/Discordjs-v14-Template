import { client } from '#client';
import chalk from 'chalk';

export async function handleLegacyCommands() {
	const { aliases, legacyArray, legacyCommands, utils } = client;

	const legacyCommandFiles = await utils.loadFiles('./src/legacyCommands');
	let legacyCount = 0;
	for (const file of legacyCommandFiles) {
		const command = await import(file);
		const legacyCommand = command.default;
		legacyArray.push(legacyCommand);
		legacyCommands.set(legacyCommand.name, legacyCommand);
		if (!legacyCommand) {
			console.error(
				chalk.italic.bold.redBright(
					`Legacy Command: ${file} does not have a default export. Skipping...`
				)
			);
		}
		if (!legacyCommand.name)
			console.error(
				chalk.italic.bold.redBright(
					`Legacy Command: ${file} doesn't have a name.`
				)
			);
		legacyCount++;
		if (legacyCommand.aliases && Array.isArray(legacyCommand.aliases)) {
			legacyCommand.aliases.forEach((/** @type {string} */ alias) =>
				aliases.set(alias, legacyCommand.name)
			);
		}
	}
	if (legacyCount > 0) {
		console.log(
			chalk.blueBright(`[HANDLER] - Loaded ${legacyCount} Legacy Command(s)!`)
		);
	}
}
