/**
 *
 * @param {import("../../Structures/bot")} client
 */
export default (client) => {
	const { aliases, legacyArray, legacyCommands, rds } = client;
	client.handleLegacyCommands = async () => {
		const commandFolders = rds('./src/legacyCommands');
		for (const folder of commandFolders) {
			const commandFiles = rds(`./src/legacyCommands/${folder}`).filter(
				(file) => file.endsWith('.js')
			);

			for (const file of commandFiles) {
				const command = require(`../../legacyCommands/${folder}/${file}`);
				legacyArray.push(command);
				legacyCommands.set(command.name, command);

				if (command.aliases && Array.isArray(command.aliases)) {
					command.aliases.forEach((alias) => aliases.set(alias, command.name));
				}
			}
		}
	};
};
