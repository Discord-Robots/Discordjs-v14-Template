import { client } from '#client';

export async function handleComponents() {
	const { components, utils } = client;
	const { buttons, selectMenus, modals } = components;

	const buttonFiles = await utils.loadFiles('./src/components/buttons');
	const modalFiles = await utils.loadFiles('./src/components/modals');
	const selectMenuFiles = await utils.loadFiles('./src/components/selectMenus');

	for (const file of buttonFiles) {
		const button = await import(file);
		buttons.set(button.default.data.id, button);
	}

	for (const file of selectMenuFiles) {
		const selectMenu = await import(file);
		selectMenus.set(selectMenu.default.data.id, selectMenu);
	}

	for (const file of modalFiles) {
		const modal = await import(file);
		modals.set(modal.default.data.id, modal);
	}
}
