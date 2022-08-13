module.exports = {
  name: "ready",
  async execute(client) {
    console.log(
      client.chalk.blue(`[CLIENT] - ${client.user.tag} has logged into Discord!`)
    );
    client.user.setPresence({
      activities: [{ name: "/commands", type: 5 }],
      status: "dnd",
    });
  },
};
