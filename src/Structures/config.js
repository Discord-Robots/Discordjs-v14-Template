export const config = {
	devs: ['', ''],
	emojis: {
		economy: '💰',
		fun: '🎉',
		moderation: '🔨',
		owner: '😎',
		util: '⚙️',
	},
	economy: {
		currency: '',
		bank: 'https://informationsecuritybuzz.com/wp-content/uploads/bank-and-security.jpg',
		wallet:
			'https://ae01.alicdn.com/kf/HTB1cBiJQpXXXXbuXXXXq6xXFXXXf/New-men-s-wallet-card-package-short-leather-wallet.jpg',
	},
	env: {
		BotToken: `${process.env.BotToken}`,
		BotOwnerID: `${process.env.BotOwnerID}`,
		AppID: `${process.env.AppID}`,
		Connect: `${process.env.Connect}`,
		ClientSecret: `${process.env.ClientSecret}`,
		DevGuild: `${process.env.DevGuild}`,
		DevChannel: `${process.env.DevChannel}`,
		Prefix: `${process.env.Prefix}`,
	},
};
