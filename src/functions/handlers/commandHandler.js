const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { DevGuild, AppID, BotToken } = process.env;
const fs = require("node:fs");

module.exports = (client) => {
  const { commands, commandArray } = client;
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }
    const rest = new REST({ version: "10" }).setToken(BotToken);

    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");

        //For Testing purposes
        await rest.put(Routes.applicationGuildCommands(AppID, DevGuild), {
          body: commandArray,
        });

        //For All Guilds, Once Fully Developed. Uncomment the following to use global commands.
        // await rest.put(Routes.applicationCommands(AppID), {
        //   body: commandArray,
        // });

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
