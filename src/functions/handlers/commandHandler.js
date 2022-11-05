const { DevGuild } = process.env;
/**
 *
 * @param {import("../../Structures/bot")} client
 */
module.exports = (client) => {
  const { commands, commandArray, developerArray, rds } = client;
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

    //Global Commands!
    await client.application.commands.set(commandArray);

    //Single Guild Commands!
    if (DevGuild) {
      const devGuild = client.guilds.cache.get(DevGuild);
      devGuild.commands.set(developerArray);
    }
  };
};
