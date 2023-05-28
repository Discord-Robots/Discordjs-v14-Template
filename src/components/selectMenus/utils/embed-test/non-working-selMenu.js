// THIS IS JUST AN EXAMPLE OF HOW TO SETUP A SELECT MENU COMPONENT FILE!
// THIS DOES NOTHING!!!
// IF NOT PLACED HERE, YOU WOULD GET AN ERROR UPON STARTING FOR FIRST TIME.

export default {
	data: {
		id: 'non-working-selMenu',
	},
	/**
	 *
	 * @param {import("discord.js").SelectMenuInteraction} interaction
	 * @param {import("../../../../Structures/bot")} client
	 * @returns
	 */
	async execute(interaction, client) {
		return await interaction.update({
			content: `You selected ${interaction.values[0]}!`,
			components: [],
		});
	},
};
