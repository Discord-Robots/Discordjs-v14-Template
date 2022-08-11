const { readdirSync } = require("fs");

module.exports = (client) => {
  client.removeAllListeners();
  client.handleEvents = async () => {
    const eventFolders = readdirSync(`./src/events`);
    for (const folder of eventFolders) {
      const eventFiles = readdirSync(`./src/events/${folder}`).filter((file) =>
        file.endsWith(".js")
      );
      for (const file of eventFiles) {
        const event = require(`../../events/${folder}/${file}`);
        if (event.once)
          client.once(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  };
};
