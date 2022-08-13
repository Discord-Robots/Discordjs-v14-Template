module.exports = (client) => {
  client.removeAllListeners();
  client.handleEvents = async () => {
    const eventFolders = client.rds(`./src/events`);
    let count = 0;
    for (const folder of eventFolders) {
      const eventFiles = client
        .rds(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of eventFiles) {
        const event = require(`../../events/${folder}/${file}`);
        const execute = (...args) => event.execute(...args, client)
        if (event.once)
          client.once(event.name, execute);
        else client.on(event.name, execute);
        client.events.set(event.name, execute)
        count++
      }
    }
    console.log(client.chalk.blue(`[HANDLER] - Loaded ${count} Event(s)!`));
  };
};
