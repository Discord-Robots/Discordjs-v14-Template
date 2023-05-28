/**
 * If you want to create commands for use in ONLY one server:
 * uncomment lines 6 and 36-39 and comment out line 32.
 * And be sure to set DevGuild/Channel in .env
 */
// const { DevGuild } = process.env;
/**
 *
 * @param {import("../../Structures/bot")} client
 */
export default (client) => {
	const { commands, commandArray, developerArray, rds } = client;
	client.handleCommands = async () => {
		const commandFolders = rds('./src/commands');
		for (const folder of commandFolders) {
			const commandFiles = rds(`./src/commands/${folder}`).filter((file) =>
				file.endsWith('.js')
			);

			for (const file of commandFiles) {
				const command = require(`../../commands/${folder}/${file}`);

				if (command.developer) {
					developerArray.push(command.data.toJSON());
				} else {
					commandArray.push(command.data.toJSON());
				}
				commands.set(command.data.name, command);
			}
		}

		//Global Commands!
		await client.application.commands.set(commandArray);

		//Single Guild Commands!
		// if (DevGuild) {
		//   const devGuild = client.guilds.cache.get(DevGuild);
		//   devGuild.commands.set(developerArray);
		// }
	};
};
