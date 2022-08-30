const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { DevGuild, AppID, BotToken } = process.env;

module.exports = (client) => {
  const { commands, commandArray, developerArray } = client;

  client.handleCommands = async () => {
    const commandFolders = client.rds("./src/commands");
    let comands = 0;
    let devCount = 0;
    for (const folder of commandFolders) {
      const commandFiles = client
        .rds(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command.developer) {
          developerArray.push(command.data.toJSON())
          devCount++
        } else {
          commandArray.push(command.data.toJSON());
          comands++
        }
        commands.set(command.data.name, command);
      }
    }

    const rest = new REST({ version: "10" }).setToken(BotToken);
    (async () => {
      try {
        console.log(client.chalk.yellowBright("[APPLICATION] - Started refreshing application (/) commands."));

        await rest.put(Routes.applicationGuildCommands(AppID, DevGuild), { body: developerArray })
          .then(
            console.log(
              client.chalk.blue(
                `[HANDLER] - Loaded ${devCount} Developer Command(s)!`
              )
            )
          );
        await rest.put(Routes.applicationCommands(AppID), { body: commandArray })
          .then(
            console.log(
              client.chalk.blue(
                `[HANDLER] - Loaded ${comands} Global Command(s)!`
              )
            )
          );

        console.log(client.chalk.greenBright("[APPLICATION] - Successfully reloaded application (/) commands."));
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
