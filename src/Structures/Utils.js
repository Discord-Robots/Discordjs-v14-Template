import chalk from 'chalk';
import Guild from '#schemas/guild.js';
import pkg from 'glob';
const { glob } = pkg;
import { promisify } from 'util';
const PG = promisify(glob);
import { config } from './config.js';
const { Prefix } = config.env;

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
}
