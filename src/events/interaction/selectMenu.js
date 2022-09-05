const { Client, CommandInteraction, Collection } = require("discord.js");
const data = {};

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { selectMenus, cooldowns } = client;
    if (interaction.isSelectMenu()) {
      const menu = selectMenus.get(interaction.customId);
      if (!menu) return;

      try {
        if (!cooldowns.selectMenus.has(menu.data.id)) {
          cooldowns.selectMenus.set(menu.data.id, new Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.selectMenus.get(menu.data.id);
        const cooldownAmount = (menu.cooldown || 10) * 1000; //default of 10 seconds

        if (timestamps.has(interaction.user.id)) {
          if (!client.utils.checkOwner(interaction.user.id))
            menu.execute(interaction, client);
          else {
            const expirationTime =
              timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
              const timeLeft = (expirationTime - now) / 1000;
              const message = `please wait ${timeLeft.toFixed(
                1
              )} more second(s) before reusing the \`${menu.data.id}\` menu.`;
              return interaction.reply({
                embeds: [
                  {
                    title: `Menu: \`${menu.data.id}\` is on cooldown!`,
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
        await menu.execute(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "There is no code for this select menu!",
          ephemeral: true,
        });
      }
    }
  },
};
