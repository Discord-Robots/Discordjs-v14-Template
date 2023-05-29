import {
	EmbedBuilder,
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	GuildMember,
} from 'discord.js';

export default {
	category: 'util',
	cooldown: [1, 'sec'],
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Gets a users avatar!')
		.setDMPermission(false)
		.addUserOption((user) =>
			user.setName('target').setDescription('Select a user!')
		),

	/**
	 *
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @param {import("#BOT").default} client
	 */
	execute: async (interaction, client) => {
		const targetUser =
			interaction.options.getUser('target') || interaction.user;
		const id = targetUser.id;
		const avatar = targetUser.avatar;
		const animated = avatar.startsWith('a_');
		const member = await interaction.guild.members.fetch(id);
		let op = member.nickname ? member.nickname : targetUser.username;
		const pfp = member.displayAvatarURL();

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
			.setImage(`${targetUser.displayAvatarURL({ size: 1024 })}`);

		await interaction.reply({
			embeds: [avatarEmbed],
			components: [row],
			ephemeral: true,
		});
	},
};
/**
 *
 * @param {string} type
 * @param {GuildMember} user
 * @returns
 */
function button(type, user) {
	return new ButtonBuilder({
		label: type,
		style: ButtonStyle.Link,
		url: user.displayAvatarURL(),
		type: 2,
	});
}
/**
 * @param {string} type
 */
function reverse(type) {
	return new ButtonBuilder({
		label: 'Reverse Lookup',
		style: ButtonStyle.Link,
		url: `https://www.google.com/searchbyimage?&image_url=${type}`,
		type: 2,
	});
}
