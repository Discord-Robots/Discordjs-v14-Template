import { Schema, model } from 'mongoose';

export default model(
	'blocked',
	new Schema({
		client_id: String,
		guilds: [Object],
	}),
	'blocks'
);
