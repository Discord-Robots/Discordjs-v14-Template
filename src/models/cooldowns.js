import { Schema, model } from 'mongoose';

export default model(
	'Cooldowns',
	new Schema({
		guildID: String,
		guildName: String,
		userID: String,
		userName: String,
	}),
	'Cooldowns'
);
