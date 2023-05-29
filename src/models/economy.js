import { Schema, model } from 'mongoose';

export default model(
	'Economy',
	new Schema({
		guildID: String,
		guildName: String,
		userID: String,
		userName: String,
		wallet: Number,
		bank: Number,
	}),
	'Economy'
);
