import { Collection } from 'discord.js';

export default {
	name: 'interactionCreate',
	/**
	 *
	 * @param {import("discord.js").ButtonInteraction} interaction
	 * @param {import("#BOT").default} client
	 * @returns
	 */
	async execute(interaction, client) {
		const { components, cooldowns, utils } = client;
		const { buttons } = components;
		if (interaction.isButton()) {
			const button = buttons.get(interaction.customId).default;
			if (!button) return new Error('There is no code for this button!');

			try {
				if (!cooldowns.buttons.has(button.data.id)) {
					cooldowns.buttons.set(button.data.id, new Collection());
				}
				const now = Date.now();
				const timestamps = cooldowns.buttons.get(button.data.id);
				const cooldownAmount = (button.cooldown || 10) * 1000; //default of 10 seconds

				if (timestamps.has(interaction.user.id)) {
					if (!utils.checkOwner(interaction.user.id))
						return button.execute(interaction, client);
					else {
						const expirationTime =
							timestamps.get(interaction.user.id) + cooldownAmount;
						if (now < expirationTime) {
							const timeLeft = (expirationTime - now) / 1000;
							const message = `please wait ${timeLeft.toFixed(
								1
							)} more second(s) before reusing the \`${
								button.data.id
							}\` button.`;
							return interaction.reply({
								embeds: [
									{
										title: `Button: \`${button.data.id}\` is on cooldown!`,
										description: `\\📛 **Error:** \\📛\n ${message}`,
										color: 0xfc0303,
									},
								],
								ephemeral: true,
							});
						}
					}
				}
				timestamps.set(interaction.user.id, now);
				setTimeout(
					() => timestamps.delete(interaction.user.id),
					cooldownAmount
				);
				await button.execute(interaction, client);
			} catch (error) {
				console.log(error);
			}
		}
	},
};
