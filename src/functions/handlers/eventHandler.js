import { client } from "#client";

export async function handleEvents() {
  const { events, rds } = client;
  client.removeAllListeners();
  const eventFolders = rds(`./src/events`);
  for (const folder of eventFolders) {
    const eventFiles = rds(`./src/events/${folder}`).filter((file) =>
      file.endsWith(".js")
    );
    for (const file of eventFiles) {
      const event = await import(`../../events/${folder}/${file}`);
      const execute = (/** @type {any[]} */ ...args) =>
        event.default.execute(...args, client);
      if (event.once) client.once(event.default.name, execute);
      else client.on(event.default.name, execute);
      events.set(event.default.name, execute);
    }
  }
}
