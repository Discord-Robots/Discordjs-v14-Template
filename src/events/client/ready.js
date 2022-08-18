const wait = require("node:timers/promises").setTimeout;

module.exports = {
  name: "ready",
  /**
   * 
   * @param {import('discord.js').Client} client 
   */
  async execute(client) {
    console.log(
      client.chalk.yellowBright(`[CLIENT] - Logging into Discord.....`)
    );
    await wait(3000)
    console.log(
      client.chalk.greenBright(`[CLIENT] - ${client.user.tag} has logged into Discord!`)
    );
    async function pickPresence() {
      const { statusArray } = client;
      await statusArray.push(
        {
          type: 3,
          content: `over ${client.guilds.cache.size} guild(s)`,
          status: "idle"
        },
      )
      let option = Math.floor(Math.random() * statusArray.length)
      try {
        await client.user.setPresence({
          activities: [
            {
              name: statusArray[option].content,
              type: statusArray[option].type
            }
          ],
          status: statusArray[option].status
        });

      } catch (error) {
        console.log(error)
      }
    }
    setInterval(pickPresence, 8000);
  }
};