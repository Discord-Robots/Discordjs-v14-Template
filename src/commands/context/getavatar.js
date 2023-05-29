import {
	ApplicationCommandType,
	ContextMenuCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	GuildMember,
} from 'discord.js';

export default {
	category: 'context',
	cooldown: [1, 'sec'],
	data: new ContextMenuCommandBuilder()
		.setName('Avatar')
		.setDMPermission(false)
		.setType(ApplicationCommandType.User),

	/**
	 *
	 * @param {import("discord.js").ContextMenuCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	async execute(interaction, client) {
		const userId = interaction.targetId;
		/**
		 * @type {GuildMember}
		 */
		// @ts-ignore
		const member = await interaction.guild?.members.fetch(userId);
		const pfp = member?.avatarURL();
		const animated = member?.user?.avatar?.startsWith('a_');
		let op = member?.nickname ? member.nickname : member?.user.username;

		const buttons = [
			reverse(pfp),
			button('png', member),
			button('jpg', member),
			button('webp', member),
		];

		if (animated) {
			buttons.push(button('gif', member));
		}

		/**
		 * @type {ActionRowBuilder<ButtonBuilder>}
		 */
		const row = new ActionRowBuilder();
		buttons.forEach((button) => {
			row.addComponents(button);
		});

		const avatarEmbed = new EmbedBuilder()
			.setAuthor({ name: `${op}'s avatar!` })
			.setImage(`${member?.user.displayAvatarURL({ size: 4096 })}`);

		await interaction.reply({
			embeds: [avatarEmbed],
			components: [row],
			ephemeral: true,
		});
	},
};
/**
 * @param {string} label
 * @param {GuildMember} member
 */
function button(label, member) {
	return new ButtonBuilder({
		label,
		style: ButtonStyle.Link,
		url: member.displayAvatarURL(),
		type: 2,
	});
}
/**
 * @param {string | null} link
 */
function reverse(link) {
	return new ButtonBuilder({
		label: 'Reverse Lookup',
		style: ButtonStyle.Link,
		url: `https://www.google.com/searchbyimage?&image_url=${link}`,
		type: 2,
	});
}
