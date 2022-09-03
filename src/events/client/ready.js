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
    console.log(
      client.chalk.greenBright(
        `[CLIENT] - ${client.user.tag} has logged into Discord!`
      )
    );
    client.pickPresence();
  },
};
