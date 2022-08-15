const wait = require("node:timers/promises").setTimeout;

module.exports = {
  name: "ready",
  async execute(client) {
    console.log(
      client.chalk.yellowBright(`[CLIENT] - Logging into Discord.....`)
    );
    await wait(3000)
    console.log(
      client.chalk.greenBright(`[CLIENT] - ${client.user.tag} has logged into Discord!`)
    );
    async function pickPresence() {
      let statusArray = [
        {
          type: 5,
          content: "/commands",
          status: "dnd"
        },
        {
          type: 0,
          content: "Pokemon",
          status: "online"
        },
        {
          type: 3,
          content: "over 1 guild",
          status: "idle"
        },
        {
          type: 0,
          content: "Discord.js v14",
          status: "idle"
        }
      ];
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
    setInterval(pickPresence, 8000)
  }
};