import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export const config = {
	emojis: {
		economy: '💰',
		fun: '🎉',
		moderation: '🔨',
		owner: '😎',
		util: '⚙️',
	},
	economy: {
		currency: '🪙',
		bank: '🏦',
		wallet: '💰',
		another: '💱',
	},
	env: {
		BotToken: `${process.env.BotToken}`,
		BotOwnerID: `${process.env.BotOwnerID}`,
		AppID: `${process.env.AppID}`,
		Connect: `${process.env.Connect}`,
		ClientSecret: `${process.env.ClientSecret}`,
		DevGuild: `${process.env.DevGuild}`,
		DevChannel: `${process.env.DevChannel}`,
		Devs: process.env.Devs,
		Prefix: `${process.env.Prefix}`,
	},
	deniedCustomIDs: ['help-menu', 'ticket_modal'],
	TicketConfig: {
		pins: [
			{ General: ['1050673914956746794', '12345678990'] },
			{ 'Lost Items': ['1050674146679468102'] },
		],
		pings: {
			General: ['<@&1050673914956746794>', '<@&12345>'],
			'Lost Items': ['<@&1050674146679468102>', '<@&1050674146679468102>'],
		},
		/**
		 * @type {ActionRowBuilder<StringSelectMenuBuilder>}
		 */
		menu: new ActionRowBuilder({
			components: [
				new StringSelectMenuBuilder()
					.setCustomId('ticket-category')
					.setMaxValues(1)
					.setPlaceholder(`Select a topic...`)
					.addOptions(
						{
							label: 'General Support',
							emoji: '🛠️',
							value: 'General',
							description: 'Subject: General Support and Questions',
						},
						{
							label: 'Lost Items',
							emoji: '🛠️',
							value: 'Lost Items',
							description: 'Subject: Lost Items In Need Of Retrieval',
						},
						{
							label: 'Report a Bug',
							emoji: '🛠️',
							value: 'Bug Report',
							description: 'Subject: Need to Report a Bug',
						},
						{
							label: 'Report a Player',
							emoji: '🛠️',
							value: 'Player Report',
							description: 'Subject: Need to Report a Player for Abuse',
						},
						{
							label: 'Report a Staff Member',
							emoji: '🛠️',
							value: 'Staff Report',
							description: 'Subject: Need to report a Staff Member for Abuse',
						},
						{
							label: 'Ban Appeal',
							emoji: '🛠️',
							value: 'Ban Appeal',
							description: 'Subject: Removing a Ban',
						},
						{
							label: 'Gang Ticket',
							emoji: '🛠️',
							value: 'Gang',
							description: 'Subject: Gang Application stuff, War stuff',
						},
						{
							label: 'Business Application',
							emoji: '🛠️',
							value: 'Biz App',
							description: 'Subject: Further my Business App',
						},
						{
							label: 'Staff Application',
							emoji: '🛠️',
							value: 'Staff App',
							description: 'Subject: Looking to become Staff',
						}
					),
			],
		}),
	},
};
