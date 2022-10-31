const {
  SlashCommandBuilder,
  EmbedBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  category: "util",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Returns help menu.")
    .setDMPermission(false),
  /**
   *
   * @param {import("../../Structures/bot.js")} client
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @returns
   */
  async execute(interaction, client) {
    try {
      const emoji = client.config.emojis;
      let directories;
      if (!client.config.devs.includes(interaction.user.id)) {
        directories = [
          ...new Set(
            client.commands
              .filter(
                (cmd) => cmd.category !== "owner" && cmd.category !== "context"
              )
              .map((cmd) => cmd.category)
          ),
        ];
      } else {
        directories = [
          ...new Set(
            client.commands
              .filter((cmd) => cmd.category !== "context")
              .map((cmd) => cmd.category)
          ),
        ];
      }

      const categories = directories.map((dir) => {
        const getcmds = client.commands
          .filter((cmd) => cmd.category === dir)
          .map((cmd) => {
            return {
              name: cmd.data.name,
              description: cmd.data.description,
              inline: true,
            };
          });
        return {
          directory: client.utils.capitalise(dir),
          commands: getcmds,
        };
      });

      const embed = new EmbedBuilder({
        description: "Please choose a category from the dropdown menu.",
      });
      const components = (state) => [
        {
          type: 1,
          components: [
            {
              type: 3,
              custom_id: "help-menu",
              disabled: state,
              placeholder: "Please select a category",
              options: categories.map((cmd) => {
                return {
                  label: `${cmd.directory}` || ".",
                  value: `${cmd.directory.toLowerCase()}` || ".",
                  description: `Commands from ${cmd.directory} category` || ".",
                  emoji: `${emoji[cmd.directory.toLowerCase()]}` || "❤️",
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
      const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.SelectMenu,
        timeout: 5000,
      });

      collector.on("collect", (interaction) => {
        const [directory] = interaction.values;
        const category = categories.find(
          (x) => x.directory.toLowerCase() === directory
        );

        const embed2 = new EmbedBuilder().addFields(
          category.commands.map((cmd) => {
            return {
              name: `\`${cmd.name}\``,
              value: `${cmd.description}`,
              inline: true,
            };
          })
        );

        if (directory === "fun") {
          embed2.setDescription(
            `${emoji.fun} ${client.utils.capitalise(directory)} Commands:`
          );
        }
        if (directory === "mod") {
          embed2.setDescription(
            `${emoji.mod} ${client.utils.capitalise(directory)} Commands:`
          );
        }
        if (directory === "owner") {
          embed2.setDescription(
            `${emoji.owner} ${client.utils.capitalise(directory)} Commands:`
          );
        }
        if (directory === "util") {
          embed2.setDescription(
            `${emoji.util} ${client.utils.capitalise(directory)} Commands:`
          );
        }

        interaction.update({ embeds: [embed2] });
      });

      collector.on("end", () => {
        interaction.update({ components: components(true) });
      });
    } catch (error) {
      console.log(error);
    }
  },
};
