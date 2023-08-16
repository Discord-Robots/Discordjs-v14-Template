import chalk from 'chalk';

/**
 * @param {import("#BOT").default} client
 */
export async function handleCommands(client) {
	const { commands, commandArray, config, developerArray, utils } = client;
	const slashCommands = await utils.loadFiles('./src/commands');
	let counts = {
		slashCount: 0,
		devCount: 0,
	};
	for (const file of slashCommands) {
		const slashCommand = await import(file);
		const slash = slashCommand.default;
		if (!slash) {
			console.error(
				chalk.italic.bold.redBright(
					`Slash Command: ${file
						.split('/')
						.pop()} does not have a default export. Skipping...`
				)
			);
		}
		if (!slash.data.name || !slash.execute) {
			console.error(
				chalk.italic.bold.redBright(
					`Slash Command: ${file
						.split('/')
						.pop()} is missing a 'name' or the 'execute' property.`
				)
			);
		}
		if (slash.developer === true) {
			counts.devCount++;
			developerArray.push(slash.data.toJSON());
		} else if (!slash.developer || slash.developer === false) {
			counts.slashCount++;
			commandArray.push(slash.data.toJSON());
		}
		commands.set(slash.data.name, slashCommand);
	}
	await client.guilds.cache
		.get(config.env.DevGuild)
		.commands.set(developerArray);
	await client.application.commands.set(commandArray);
	let type;
	for (let [k, v] of Object.entries(counts)) {
		if (k === 'slashCount') {
			type = 'Global';
		} else type = 'Developer';
		if (v > 0)
			console.log(
				chalk.blueBright(`[HANDLER] - Loaded ${v} ${type} Slash Command(s)!`)
			);
	}
}
