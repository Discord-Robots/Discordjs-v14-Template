/**
 *
 * @param {import("../../Structures/bot")} client
 */
export default (client) => {
  client.cool = (module, type, interaction) => {
    const { cooldowns, utils } = client;
    const { checkOwner, prettyTime, errorReplyEmbed } = utils;
    if (!cooldowns.commands.has(command.data.type)) {
      cooldowns.commands.set(command.data.type, new Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.module.get(module.data.type);
    const time = module.cooldown[0];
    const increment = module.cooldown[1];
    /**
     * @type {number}
     */
    let num;
    switch (increment) {
      case "sec":
        num = 1000;
        break;
      case "min":
        num = 60000;
        break;
      case "hr":
        num = 3600000;
        break;
      case "day":
        num = 86400000;
        break;
      case "week":
        num = 604800000;
        break;
      case "month":
        num = 18144000000; //30 days
        break;
    }
    const cooldownAmount = time * num;

    if (timestamps.has(interaction.user.id)) {
      if (!checkOwner(interaction.user.id))
        return command.execute(interaction, client);
      else {
        const expirationTime =
          timestamps.get(interaction.user.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          const message = `please wait ${prettyTime(
            timeLeft.toFixed(0)
          )} before reusing the \`${module.data.type}\` command.`;

          return errorReplyEmbed(
            message,
            interaction,
            `Command: \`${module.data.type}\` is on cooldown!`,
            true
          );
        }
      }
    }
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
  };
};
