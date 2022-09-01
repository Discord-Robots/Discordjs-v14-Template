module.exports = (client) => {
  client.pickPresence = async () => {
    /*
    different types can be a number and they as follows:
    Playing: 0
    Streaming: 1
    Listening: 2
    Watching: 3
    Competing: 5

    Want a changing status? Just change line 47 to `status: statusArray[option].status` and insert your own status into each object above.
    Different statuses include "online", "idle", "dnd", and "invisible"
    */

    let statusArray = [
      {
        type: 5,
        content: "/commands",
        status: ""
      },
      {
        type: 3,
        content: `over ${client.guilds.cache.size} guild(s)`,
        status: ""
      },
      {
        type: 3,
        content: `over ${client.users.cache.size} user(s)`,
        status: ""
      },
      {
        type: 0,
        content: "with Discord.js v14",
        status: ""
      },
    ];

    let option = Math.floor(Math.random() * statusArray.length);

    client.user.setPresence({
      activities: [
        {
          name: statusArray[option].content,
          type: statusArray[option].type,
        },
      ],
      status: "dnd",
    });
  };
};
