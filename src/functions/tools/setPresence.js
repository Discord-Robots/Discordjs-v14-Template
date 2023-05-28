/**
 *
 * @param {import("../../Structures/bot")} client
 */
export default (client) => {
	client.pickPresence = async () => {
		/*
    different types can be a number and they as follows:
    Playing: 0
    Streaming: 1
    Listening: 2
    Watching: 3
    Competing: 5
    */

		let acts = [
			{
				type: 5,
				content: '/commands',
				status: 'dnd',
			},
			{
				type: 3,
				content: `over ${client.guilds.cache.size} guild(s)`,
				status: 'online',
			},
			{
				type: 3,
				content: `over ${client.users.cache.size} user(s)`,
				status: 'online',
			},
			{
				type: 0,
				content: 'with Discord.js v14',
				status: 'idle',
			},
		];

		setInterval(async () => {
			const currentAct = acts.shift();
			client.user.setPresence({
				activities: [
					{
						name: currentAct.content.toString(),
						type: currentAct.type,
					},
				],
				status: currentAct.status,
				/**
				 * Don't want a changing status? Just change the line above to `status: "status"`. Different statuses include "online", "idle", "dnd", and "invisible"
				 */
			});
			acts.push(currentAct);
		}, 15000);
	};
};
