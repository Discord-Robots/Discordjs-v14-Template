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
	deniedCustomIDs: ['help-menu'],
};
