import { Schema, model } from 'mongoose';

export default model(
	'Economy',
	new Schema({
		userID: String,
		profiles: [
			{
				guildID: String,
				guildName: String,
				userName: String,
				embedColor: Number,
				wallet: Number,
				bank: Number,
			},
		],
	}),
	'Economy'
);
