module.exports = (client) => {
  client.pickPresence = async () => {
    /*
    different types can be a number and they as follows:
    Playing: 0
    Streaming: 1
    Listening: 2
    Watching: 3
    Competing: 5

    Want a changing status? Just change line 47 to `status: obj[i].status` and insert your own status into each object below.
    Different statuses include "online", "idle", "dnd", and "invisible"
    */

    let obj = [
      {
        type: 5,
        content: "/commands",
        // status: ""
      },
      {
        type: 3,
        content: `over ${client.guilds.cache.size} guild(s)`,
        // status: ""
      },
      {
        type: 3,
        content: `over ${client.users.cache.size} user(s)`,
        // status: ""
      },
      {
        type: 0,
        content: "with Discord.js v14",
        // status: ""
      },
    ];

    setInterval(async () => {
      for (const key of Object.keys(obj)) {
        await client.user.setPresence({
          activities: [
            {
              name: `${obj[key].content}`,
              type: obj[key].type,
            },
          ],
          status: "dnd",
        });
      }
    }, 8000);
  };
};
