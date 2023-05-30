import { Collection, InteractionResponse } from 'discord.js';
import { client } from '#client';
import cooldownSchema from '#schemas/cooldowns.js';

/**
 * @param {any} module
 * @param {string} type
 * @param {import('discord.js').AnySelectMenuInteraction | import('discord.js').ButtonInteraction | import('discord.js').ModalSubmitInteraction | import('discord.js').ChatInputCommandInteraction | import('discord.js').ContextMenuCommandInteraction } interaction
 * @returns {Promise<InteractionResponse>}
 */
export async function cooldown(module, type, interaction) {
	let Cooldowns = await cooldownSchema.findOne();
	const { cooldowns, utils } = client;
	const { capitalise, checkOwner } = utils;
	let mod;
	let cdType;
	switch (type) {
		case 'command':
			mod = module.data.name;
			cdType = cooldowns.commands;
			break;
		case 'button':
			mod = module.data.id;
			cdType = cooldowns.buttons;
			break;
		case 'modal':
			mod = module.data.id;
			cdType = cooldowns.modals;
			break;
		case 'selectMenu':
			mod = module.data.id;
			cdType = cooldowns.selectMenus;
			break;
	}

	if (!cdType.has(mod)) {
		cdType.set(mod, new Collection());
	}
	const now = Date.now();
	const timestamps = cdType?.get(mod);
	/**
	 * @type {number}
	 */
	const time = module.cooldown[0];
	/**
	 * @type {string}
	 */
	const increment = module.cooldown[1];

	const intervals = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hr: 3600,
		min: 60,
		sec: 1,
	};
	/**
	 * @type {number}
	 */
	let cooldownAmount;
	if (increment in intervals) {
		/**
		 * @type {number}
		 */
		// @ts-expect-error
		const derivedSeconds = intervals[increment];
		cooldownAmount = time * derivedSeconds * 1000;
	}

	if (timestamps.has(interaction.user.id)) {
		if (!checkOwner(interaction.user.id))
			return await module.execute(interaction, client);
		else {
			const expirationTime =
				timestamps.get(interaction.user.id) + cooldownAmount;
			if (now < expirationTime) {
				const remaining = `<t:${(
					(new Date().getTime() + cooldownAmount) /
					1000
				).toFixed(0)}:R>`;
				const deleteTime = expirationTime - now;
				const message = `The \`${mod}\` ${type} will be available for use ${remaining}.`;

				const msg = await interaction.channel.send({
					embeds: [
						{
							title: `${capitalise(type)}: \`${mod}\` is on cooldown!`,
							description: `${message}`,
						},
					],
				});
				setTimeout(async () => {
					await msg.delete();
				}, deleteTime);
			}
		}
	}
	timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
}
