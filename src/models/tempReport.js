import { Schema, model } from 'mongoose';

export default model(
	'TempReport',
	new Schema({
		messageId: String,
		messageLink: String,
		guild: {
			guildId: String,
			channelId: String,
			msgUserId: String,
			msgUserTag: String,
			reporterId: String,
		},
	}),
	'tempReports'
);
