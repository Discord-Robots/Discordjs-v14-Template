module.exports = {
  name: "ready",
  async execute(client) {
    console.log(
      client.chalk.bold.red(`${client.user.tag} has logged into Discord.`)
    );
    client.user.setPresence({
      activities: [{ name: "/commands", type: 5 }],
      status: "dnd",
    });
  },
};
