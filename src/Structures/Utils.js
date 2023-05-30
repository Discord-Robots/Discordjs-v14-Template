import chalk from 'chalk';
import Guild from '#schemas/guild.js';
import pkg from 'glob';
const { glob } = pkg;
import { promisify } from 'util';
const PG = promisify(glob);
import mongoose from 'mongoose';
import { config } from './config.js';
const { connect, connection } = mongoose;
const { Connect, Prefix } = config.env;

export default class Utils {
	/**
	 * @param {import('#BOT').default} client
	 */
	constructor(client) {
		this.client = client;
	}

	/**
	 * @param {string} guildID
	 * @param {string} guildName
	 */
	async guild(guildID, guildName) {
		const guild = await Guild.findOne({
			guildID: guildID,
		});
		if (!guild) {
			const newData = new Guild({
				guildID,
				guildName,
				prefix: Prefix,
			});
			newData.save();
			return newData;
		} else {
			return guild;
		}
	}

	/**
	 * @param {string} guildID
	 * @param {string} guildName
	 */
	async getSetup(guildID, guildName) {
		const setup = await Guild.findOne({
			guildID,
			guildName,
		});
		return setup;
	}

	/**
	 * @param {number} time
	 */
	async wait(time) {
		const wait = require('node:timers/promises').setTimeout;
		await wait(time);
	}

	/**
	 * @param {number} milliseconds
	 */
	prettyTime(milliseconds) {
		const seconds = Math.floor(milliseconds / 1000);
		const hrs = Math.floor(seconds / 3600);
		const mins = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);

		const timeArray = [];
		if (hrs > 0) timeArray.push(`\`${hrs}\` hour${hrs > 1 ? 's' : ' '}`);
		if (mins > 0) timeArray.push(`\`${mins}\` minute${mins > 1 ? 's' : ' '}`);
		if (secs > 0) timeArray.push(`\`${secs}\` second${secs > 1 ? 's' : ' '}`);

		return timeArray.join(', ');
	}

	/**
	 * @param {string} string
	 */
	capitalise(string) {
		return string
			.split(' ')
			.map(
				(/** @type {string} */ str) =>
					str.slice(0, 1).toUpperCase() + str.slice(1)
			)
			.join(' ');
	}

	/**
	 * @param {string} string
	 */
	eventCapitalise(string) {
		return string
			.split(' ')
			.map(
				(/** @type {string} */ str) =>
					str.slice(0, 1).toLowerCase() + str.slice(1)
			)
			.join(' ');
	}

	/**
	 * @param {number} bytes
	 */
	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	/**
	 * @param {string} user
	 */
	checkOwner(user) {
		return process.env.BotOwnerID !== user;
	}

	async dbConnect() {
		if (!Connect) return;
		const HOSTS_REGEX =
			/^(?<protocol>[^/]+):\/\/(?:(?<username>[^:@]*)(?::(?<password>[^@]*))?@)?(?<hosts>(?!:)[^/?@]*)(?<rest>.*)/;
		const match = Connect.match(HOSTS_REGEX);
		if (!match) {
			return console.error(
				chalk.red.bold(`[DATABASE]- Invalid connection string "${Connect}"`)
			);
		}
		const dbOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoIndex: true,
			connectTimeoutMS: 10000,
			family: 4,
		};

		connection.on('connecting', () => {
			console.log(chalk.yellowBright('[DATABASE]- Mongoose is connecting...'));
		});

		connect(Connect, dbOptions);
		Promise = Promise;

		connection.on('connected', () => {
			console.log(
				chalk.greenBright('[DATABASE]- Mongoose has successfully connected!')
			);
		});

		connection.on('err', (err) => {
			console.error(
				chalk.redBright(`[DATABASE]- Mongoose connection error: \n${err.stack}`)
			);
		});

		connection.on('disconnected', () => {
			console.warn(chalk.red('[DATABASE]- Mongoose connection lost'));
		});
	}

	/**
	 * @param {string} dirName
	 */
	async loadFiles(dirName) {
		const Files = await PG(
			`${process.cwd().replace(/\\/g, '/')}/${dirName}/**/*.js`
		);
		Files.forEach(async (file) => {
			const module = await import(file);
			Reflect.deleteProperty(module, 'default');
			Reflect.deleteProperty(globalThis, file);
		});
		return Files;
	}

	async logger() {
		//Client
		console.log(chalk.yellowBright(`[CLIENT] - Logging into Discord...`));
		console.log(
			chalk.yellowBright(
				'[APPLICATION] - Started refreshing application (/) commands.'
			)
		);

		//Events
		const events = await this.loadFiles('./src/events');
		let eventCount = 0;
		for (const file of events) {
			const event = await import(file);
			let def = event.default;
			if (!def) {
				console.error(
					chalk.italic.bold.redBright(
						`Event: ${file
							.split('/')
							.pop()} does not have a default export. Skipping...`
					)
				);
			}
			if (!def.name || !def.execute) {
				console.error(
					chalk.italic.bold.redBright(
						`Event: ${file
							?.split('/')
							?.pop()
							?.replace(
								'.js',
								''
							)} is missing the 'name' or 'execute' property. Skipping...`
					)
				);
			}
			eventCount++;
		}
		if (eventCount > 0)
			console.log(
				chalk.blueBright(`[HANDLER] - Loaded ${eventCount} Event(s)!`)
			);

		//Legacy Commands
		if (Prefix) {
			const legacyCommands = await this.loadFiles('./src/legacyCommands');
			let legacyCount = 0;
			for (const file of legacyCommands) {
				const legacyCommand = await import(file);
				let def = legacyCommand.default;
				if (!def) {
					console.error(
						chalk.italic.bold.redBright(
							`Legacy Command: ${file} does not have a default export. Skipping...`
						)
					);
				}
				if (!def.name)
					console.error(
						chalk.italic.bold.redBright(
							`Legacy Command: ${file} doesn't have a name.`
						)
					);
				legacyCount++;
			}

			if (legacyCount > 0) {
				console.log(
					chalk.blueBright(
						`[HANDLER] - Loaded ${legacyCount} Legacy Command(s)!`
					)
				);
			}
		}

		//Slash Commands
		const slashCommands = await this.loadFiles('./src/commands');
		let slashCount = 0;
		let devCount = 0;
		for (const file of slashCommands) {
			const slashCommand = await import(file);
			let def = slashCommand.default;
			if (!def) {
				console.error(
					chalk.italic.bold.redBright(
						`Slash Command: ${file
							.split('/')
							.pop()} does not have a default export. Skipping...`
					)
				);
				continue;
			}
			if (!def.data.name || !def.execute) {
				console.error(
					chalk.italic.bold.redBright(
						`Slash Command: ${file
							.split('/')
							.pop()} is missing a 'name' or the 'execute' property.`
					)
				);
				continue;
			}
			if (def.developer) devCount++;
			else slashCount++;
		}
		if (slashCount > 0)
			console.log(
				chalk.blueBright(
					`[HANDLER] - Loaded ${slashCount} Global Slash Command(s)!`
				)
			);
		if (devCount > 0)
			console.log(
				chalk.blueBright(
					`[HANDLER] - Loaded ${devCount} Developer Slash Command(s)!`
				)
			);

		//Components
		const buttons = await this.loadFiles('./src/components/buttons');
		const modals = await this.loadFiles('./src/components/modals');
		const selectMenus = await this.loadFiles('./src/components/selectMenus');

		let butCount = 0;
		let modCount = 0;
		let smCount = 0;

		for (const file of buttons) {
			const button = await import(file);
			let def = button.default;
			if (!def) {
				console.error(
					chalk.italic.bold.redBright(
						`Button: ${file
							.split('/')
							.pop()} does not have a default export. Skipping...`
					)
				);
				continue;
			}
			if (!def.data || !def.execute)
				console.error(
					chalk.italic.bold.redBright(
						`Button: ${file
							.split('/')
							.pop()} is missing the 'data' or 'execute' property.`
					)
				);
			butCount++;
		}
		if (butCount > 0)
			console.log(
				chalk.blueBright(`[HANDLER] - Loaded ${butCount} Button(s)!`)
			);

		for (const file of modals) {
			const modal = await import(file);
			let def = modal.default;
			if (!def) {
				console.error(
					chalk.italic.bold.redBright(
						`Modal: ${file
							.split('/')
							.pop()} does not have a default export. Skipping...`
					)
				);
				continue;
			}
			if (!def.data || !def.execute)
				return console.error(
					chalk.italic.bold.redBright(
						`Modal: ${file
							.split('/')
							.pop()} is missing the 'data' or 'execute' property.`
					)
				);
			modCount++;
		}
		if (modCount > 0)
			console.log(chalk.blueBright(`[HANDLER] - Loaded ${modCount} Modal(s)!`));

		for (const file of selectMenus) {
			const selectMenu = await import(file);
			let def = selectMenu.default;
			if (!def) {
				console.error(
					chalk.italic.bold.redBright(
						`Select Menu: ${file
							.split('/')
							.pop()} does not have a default export. Skipping...`
					)
				);
				continue;
			}
			if (!def.data || !def.execute)
				console.error(
					chalk.italic.bold.redBright(
						`Select Menu: ${file
							.split('/')
							.pop()} is missing the 'data' or 'execute' property.`
					)
				);
			smCount++;
		}
		if (smCount > 0)
			console.log(
				chalk.blueBright(`[HANDLER] - Loaded ${smCount} Select Menu(s)!`)
			);

		console.log(
			chalk.greenBright(
				'[APPLICATION] - Successfully reloaded application (/) commands.'
			)
		);
		console.log(chalk.greenBright(`[CLIENT] - Logged into Discord!`));
		//MongoDB
		await this.dbConnect();

		//Database Models
		const dbModels = await this.loadFiles('./src/models');
		let modelCount = 0;
		for (const file of dbModels) {
			const model = await import(file);
			let def = model.default;
			if (!def) {
				console.error(
					chalk.italic.bold.redBright(
						`Model: ${file
							.split('/')
							.pop()} does not have a default export. Skipping...`
					)
				);
				continue;
			}
			modelCount++;
		}
		if (modelCount > 0) {
			console.log(
				chalk.blueBright(`[DATABASE]- Loaded ${modelCount} Model(s)!`)
			);
		}
	}
}
