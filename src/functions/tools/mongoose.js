import chalk from 'chalk';
import mongoose from 'mongoose';
const { connect, connection } = mongoose;

/**
 * @param {import('#BOT').default} client
 */
export async function dbConnect(client) {
	const { config, utils } = client;
	const { Connect } = config.env;
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
	const dbModels = await utils.loadFiles('./src/models');
	let modelCount = 0;
	for (const file of dbModels) {
		const modelFile = await import(file);
		let model = modelFile.default;
		if (!model) {
			console.error(
				chalk.italic.bold.redBright(
					`Model: ${file
						.split('/')
						.pop()} does not have a default export. Skipping...`
				)
			);
		}
		modelCount++;
	}
	if (modelCount > 0) {
		console.log(chalk.blueBright(`[DATABASE]- Loaded ${modelCount} Model(s)!`));
	}
}
