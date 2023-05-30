import { SlashCommandBuilder, EmbedBuilder, ComponentType } from 'discord.js';

export default {
	category: 'util',
	cooldown: [10, 'min'],
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Returns help menu.')
		.setDMPermission(false),
	/**
	 *
	 * @param {import("#BOT").default} client
	 * @param {import("discord.js").ChatInputCommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction, client) => {
		try {
			const emoji = client.config.emojis;
			let directories;
			if (!client.config.env.Devs.includes(interaction.user.id)) {
				directories = [
					...new Set(
						client.commands
							.filter(
								(cmd) =>
									cmd.default.category !== 'owner' &&
									cmd.default.category !== 'context'
							)
							.map((cmd) => cmd.default.category)
					),
				];
			} else {
				directories = [
					...new Set(
						client.commands
							.filter((cmd) => cmd.default.category !== 'context')
							.map((cmd) => cmd.default.category)
					),
				];
			}

			const categories = directories.map((dir) => {
				const getcmds = client.commands
					.filter((cmd) => cmd.default.category === dir)
					.map((cmd) => {
						return {
							name: cmd.default.data.name,
							description: cmd.default.data.description,
							inline: true,
						};
					});
				return {
					directory: client.utils.capitalise(dir),
					commands: getcmds,
				};
			});

			const embed = new EmbedBuilder({
				description: 'Please choose a category from the dropdown menu.',
			});
			const components = (/** @type {boolean} */ state) => [
				{
					type: 1,
					components: [
						{
							type: 3,
							custom_id: 'help-menu',
							disabled: state,
							placeholder: 'Please select a category',
							options: categories.map((cmd) => {
								return {
									label: `${cmd.directory}`,
									value: `${cmd.directory.toLowerCase()}`,
									description: `Commands from ${cmd.directory} category`,
									// @ts-ignore
									emoji: `${emoji[cmd.directory.toLowerCase()]}`,
								};
							}),
						},
					],
				},
			];

			await interaction.reply({
				embeds: [embed],
				components: components(false),
				fetchReply: true,
				ephemeral: true,
			});
			const collector = interaction.channel?.createMessageComponentCollector({
				componentType: ComponentType.StringSelect,
				time: 5 * 60 * 1000,
			});

			collector?.on('collect', (interaction) => {
				const [directory] = interaction.values;
				const category = categories.find(
					(x) => x.directory.toLowerCase() === directory
				);

				const embed2 = new EmbedBuilder().addFields(
					// @ts-ignore
					category.commands.map((cmd) => {
						return {
							name: `\`${cmd.name}\``,
							value: `${cmd.description}`,
							inline: true,
						};
					})
				);

				[directory].forEach(() => {
					embed2.setDescription(
						// @ts-ignore
						`${emoji[directory]} ${client.utils.capitalise(
							directory
						)} Commands:`
					);
				});

				interaction.update({ embeds: [embed2] });
			});

			collector?.on('end', async (i) => {
				await interaction.editReply({
					embeds: [
						{
							description: `Deleting message <t:${(
								(new Date().getTime() + 5 * 1000) /
								1000
							).toFixed(0)}:R>`,
						},
					],
					components: [],
				});
				setTimeout(async () => {
					await interaction.deleteReply();
				}, 5000);
			});
		} catch (error) {
			console.log(error);
		}
	},
};
