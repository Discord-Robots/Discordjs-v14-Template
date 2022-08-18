module.exports = (client) => {
    client.statusArray = [
        // different types can be a number and can be found here. https://discord-api-types.dev/api/discord-api-types-v10/enum/ActivityType
        {
            type: 5,
            content: "/commands",
            status: "dnd"
        },

        {
            type: 0,
            content: "Discord.js v14",
            status: "idle"
        }
    ];
}