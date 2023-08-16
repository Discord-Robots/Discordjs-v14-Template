import { client } from '#client';
import chalk from 'chalk';

export async function handleComponents() {
	const { components, utils } = client;
	const { buttons, selectMenus, modals } = components;

	const buttonFiles = await utils.loadFiles('./src/components/buttons');
	const modalFiles = await utils.loadFiles('./src/components/modals');
	const selectMenuFiles = await utils.loadFiles('./src/components/selectMenus');
	let counts = {
		butCount: 0,
		modCount: 0,
		smCount: 0,
	};

	for (const file of buttonFiles) {
		const buttonFile = await import(file);
		const button = buttonFile.default;
		if (!button) {
			console.error(
				chalk.italic.bold.redBright(
					`Button: ${file
						.split('/')
						.pop()} does not have a default export. Skipping...`
				)
			);
			continue;
		}
		if (!button.data || !button.data.id || !button.execute)
			console.error(
				chalk.italic.bold.redBright(
					`Button: ${file
						.split('/')
						.pop()} is missing the 'data' or 'execute' property.`
				)
			);
		counts.butCount++;
		buttons.set(button.data.id, buttonFile);
	}

	for (const file of selectMenuFiles) {
		const selectMenuFile = await import(file);
		const selectMenu = selectMenuFile.default;
		if (!selectMenu) {
			console.error(
				chalk.italic.bold.redBright(
					`Select Menu: ${file
						.split('/')
						.pop()} does not have a default export. Skipping...`
				)
			);
			continue;
		}
		if (!selectMenu.data || !selectMenu.data.id || !selectMenu.execute)
			console.error(
				chalk.italic.bold.redBright(
					`Select Menu: ${file
						.split('/')
						.pop()} is missing the 'data' or 'execute' property.`
				)
			);
		counts.smCount++;
		selectMenus.set(selectMenu.data.id, selectMenuFile);
	}

	for (const file of modalFiles) {
		const modalFile = await import(file);
		const modal = modalFile.default;
		if (!modal) {
			console.error(
				chalk.italic.bold.redBright(
					`Modal: ${file
						.split('/')
						.pop()} does not have a default export. Skipping...`
				)
			);
		}
		if (!modal.data || !modal.data.id || !modal.execute)
			return console.error(
				chalk.italic.bold.redBright(
					`Modal: ${file
						.split('/')
						.pop()} is missing the 'data' or 'execute' property.`
				)
			);
		counts.modCount++;
		modals.set(modal.data.id, modalFile);
	}

	let type;
	for (let [k, v] of Object.entries(counts)) {
		if (k === 'butCount') {
			type = 'Button';
		} else if (k === 'modCount') {
			type = 'Modal';
		} else type = 'Select Menu';
		if (v > 0)
			console.log(chalk.blueBright(`[HANDLER] - Loaded ${v} ${type}(s)!`));
	}
}
