import 'dotenv/config';
import { Client, Collection, Partials } from 'discord.js';
const {
	Channel,
	GuildMember,
	GuildScheduledEvent,
	Message,
	Reaction,
	ThreadMember,
	User,
} = Partials;
import { readdirSync } from 'fs';
import Util from './Utils.js';
import { config } from './config.js';
import { handleEvents } from '#handlers';

export default class BOT extends Client {
	constructor() {
		super({
			intents: 3276799,
			partials: [
				Channel,
				GuildMember,
				GuildScheduledEvent,
				Message,
				Reaction,
				ThreadMember,
				User,
			],
		});
		this.config = config;
		this.setMaxListeners(0);
		this.events = new Collection();
		this.legacyCommands = new Collection();
		this.aliases = new Collection();
		this.commands = new Collection();
		this.components = {
			buttons: new Collection(),
			modals: new Collection(),
			selectMenus: new Collection(),
		};
		this.cooldowns = {
			legacyCommands: new Collection(),
			buttons: new Collection(),
			commands: new Collection(),
			modals: new Collection(),
			selectMenus: new Collection(),
		};
		this.commandArray = new Array();
		this.developerArray = new Array();
		this.legacyArray = new Array();
		this.colors = {
			green: 0x22b14c,
		};
		this.rds = readdirSync;
		this.utils = new Util(this);
	}

	async start() {
		await handleEvents();
		await this.login(config.env.BotToken)
			.then(async () => {})
			.catch((e) => {
				console.error(`[Client] Unable to connect to Discord.... Error: ${e}`);
			});
	}
}
