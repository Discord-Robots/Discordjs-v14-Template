import { model, Schema } from 'mongoose';

export default model(
	'Tickets',
	new Schema({
		Guild: String,
		Category: String,
		TicketChannel: String,
		Tickets: [
			new Schema(
				{
					cat: String,
					count: { type: Number, default: 0 },
				},
				{ _id: false }
			),
		],
	}),
	'Tickets'
);
