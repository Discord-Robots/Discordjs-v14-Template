module.exports = (client) => {
  const { legacyCommands, legacyArray } = client;

  client.handleLegacyCommands = async () => {
    let count = 0;
    const commandFolders = client.rds("./src/legacyCommands");
    for (const folder of commandFolders) {
      const commandFiles = client
        .rds(`./src/legacyCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../legacyCommands/${folder}/${file}`);
        legacyArray.push(command);
        count++;
        legacyCommands.set(command.name, command);
      }
    }
    console.log(
      client.chalk.blue(`[HANDLER] - Loaded ${count} Legacy Command(s)!`)
    );
  };
};
