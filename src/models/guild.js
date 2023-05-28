import { Schema, model } from 'mongoose';

export default model(
	'Guild',
	new Schema({
		guildID: String,
		guildName: String,
		guildOwner: String,
		guildOwnerID: String,
		modLogsChannelID: String,
		prefix: { type: String, default: process.env.Prefix },
		botSpamChannel: String,
		botCommandsChannel: String,
	}),
	'Guild'
);
