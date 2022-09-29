const { Client } = require("discord.js");

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
  client.pickPresence = async () => {
    /*
    different types can be a number and they as follows:
    Playing: 0
    Streaming: 1
    Listening: 2
    Watching: 3
    Competing: 5

    Want a changing status? Just change line 47 to `status: key.status` and insert your own status into each object below.
    Different statuses include "online", "idle", "dnd", and "invisible"
    */

    let acts = [
      {
        type: 5,
        content: "/commands",
        status: "dnd"
      },
      {
        type: 3,
        content: `over ${client.guilds.cache.size} guild(s)`,
        status: "online"
      },
      {
        type: 3,
        content: `over ${client.users.cache.size} user(s)`,
        status: "online"
      },
      {
        type: 0,
        content: "with Discord.js v14",
        status: "idle"
      },
    ];

    setInterval(async () => {
      const currentAct = acts.shift(); //remove first act
      client.user.setPresence({
        activities: [
          {
            name: currentAct.content.toString(),
            type: currentAct.type,
          },
        ],
        status: currentAct.status,
        // status: "invisible"
      });
      acts.push(currentAct); //readd act back to array
    }, 15000);
  };
};
