const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { DevGuild, AppID, BotToken } = process.env;
const fs = require("node:fs");

module.exports = (client) => {
  const { commands, commandArray, developerArray } = client;

  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    let comands = 0;
    let devCount = 0;
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
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
    console.log(`Loaded ${comands} Global Commands!\nLoaded ${devCount} Developer Commands!`)

    const rest = new REST({ version: "10" }).setToken(BotToken);

    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(AppID, DevGuild), { body: developerArray })
        await rest.put(Routes.applicationCommands(AppID), { body: commandArray })

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
