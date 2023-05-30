// @ts-nocheck
import { ActivityType, PresenceUpdateStatus } from 'discord.js';
import { client } from '#client';

export async function pickPresence() {
	let acts = [
		{
			type: ActivityType.Competing,
			content: '/commands',
			status: PresenceUpdateStatus.DoNotDisturb,
		},
		{
			type: ActivityType.Watching,
			content: `over ${client.guilds.cache.size} guild(s)`,
			status: PresenceUpdateStatus.Online,
		},
		{
			type: ActivityType.Watching,
			content: `over ${client.users.cache.size} user(s)`,
			status: PresenceUpdateStatus.Online,
		},
		{
			type: ActivityType.Playing,
			content: 'with Discord.js v14',
			status: PresenceUpdateStatus.Idle,
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
		});
		acts.push(currentAct);
	}, 15000);
}
