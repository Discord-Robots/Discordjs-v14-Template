const { Guild, Client, EmbedBuilder } = require("discord.js");
const { DevChannel, Connect } = process.env;
const guildSchema = require("../../models/guild");
const blockedGuids = require('../../models/blocked');

module.exports = {
  name: "guildDelete",
  /**
   *
   * @param {Guild} guild
   * @param {Client} client
   */
  async execute(guild, client) {
    console.log(`I've been removed from guild: ${guild.name}`);
    const devChan = client.channels.cache.get(DevChannel);
    const removed = new EmbedBuilder({
      title: `Removal from Guild`,
      description: `I have been removed from guild: \n${guild.name} (${guild.id}).`,
      footer: {
        text: `${client.user.tag}`,
        iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
      }
    }).setTimestamp();
    if (guild.icon) removed.setThumbnail(`${guild.iconURL({ dynamic: true })}`);

    if (Connect) {
      await guildSchema.findOneAndDelete({ guildID: guild.id });
      let blocked = await blockedGuids.findOne({ client_id: client.user.id });

      if (blocked && blocked.guilds.includes(guild.id)) removed.addFields({ name: `Reason for Removal:`, value: `Guild was blocked from using interactions.` })
      if (devChan) {
        devChan.send({ embeds: [removed] });
      }
      else guild.systemChannel.send({ embeds: [removed] })

    } else {
      if (devChan) {
        devChan.send({ embeds: [removed] });
      }
      else client.guilds.cache.get(DevGuild).systemChannel.send({ embeds: [removed] });
    }
  },
};
