/**
 *
 * @param {import('discord.js').Client} client
 */
module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = rds("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = rds(`./src/commands/${folder}`).filter((file) =>
        file.endsWith(".js")
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

    await client.application.commands.set(commandArray);
    const devGuild = client.guilds.cache.get(process.env.DevGuild);
    devGuild.commands.set(developerArray);
  };
};
