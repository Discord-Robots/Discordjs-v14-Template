import { client } from '#client';

export async function handleCommands() {
	const { commands, commandArray, config, developerArray, rds } = client;
	const { DevGuild } = config.env;
	const commandFolders = rds('./src/commands');
	for (const folder of commandFolders) {
		const commandFiles = rds(`./src/commands/${folder}`).filter((file) =>
			file.endsWith('.js')
		);

		for (const file of commandFiles) {
			const command = await import(`../../commands/${folder}/${file}`);
			const dcmd = command.default;
			if (!dcmd) return;
			if (dcmd.developer) {
				developerArray.push(dcmd.data.toJSON());
			} else {
				commandArray.push(dcmd.data.toJSON());
			}
			commands.set(dcmd.data.name, command);
		}
	}

	if (process.argv[2] === 'global') {
		//Global Commands!
		await client.application?.commands.set(commandArray);
	} else if (process.argv[2] === 'dev') {
		//Single Guild Commands!
		if (DevGuild) {
			const devGuild = client.guilds.cache.get(DevGuild);
			devGuild?.commands.set(developerArray);
		}
	}
}
