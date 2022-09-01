const { Guild, Client, EmbedBuilder } = require("discord.js");
const { DevChannel, Connect, DevGuild } = process.env;
const guildSchema = require("../../models/guild");
const blockedGuids = require('../../models/blocked');

module.exports = {
  name: "guildCreate",
  /**
   *
   * @param {Guild} guild
   * @param {Client} client
   */
  async execute(guild, client) {
    console.log(`I joined a new guild: ${guild.name}`);
    const devChan = client.channels.cache.get(DevChannel);
    const ownerTag = guild.members.cache.get(guild.ownerId).user.tag;
    const userCount = guild.members.cache.filter((m) => !m.user.bot).size;
    const botCount = guild.members.cache.filter((m) => !m.user.bot).size;
    const created = new EmbedBuilder({
      title: `Joined New Guild!`,
      description: `Here are the details of the guild that I joined:`,
      fields: [
        { name: `Guild Name:`, value: `${guild.name}`, inline: true },
        { name: `Guild ID:`, value: `${guild.id}`, inline: true },
        { name: `Boost Level:`, value: `${guild.premiumTier}`, inline: true },
        { name: `Guild Owner:`, value: `${ownerTag}`, inline: true },
        { name: `Guild Owner ID:`, value: `${guild.ownerId}`, inline: true },
        { name: "\u200b", value: "\u200b", inline: true },
        { name: `Member Count:`, value: `${userCount}`, inline: true },
        { name: `Bot Count:`, value: `${botCount}`, inline: true },
        { name: "\u200b", value: "\u200b", inline: true },
      ],
      thumbnail: {
        url: guild.iconURL({ dynamic: true }),
      },
      footer: {
        text: `${client.user.tag}`,
        iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
      },
    }).setTimestamp();
    if (guild.banner) created.setImage(guild.bannerURL({ dynamic: true }));

    if (Connect) {
      let blocked = await blockedGuids.findOne({ client_id: client.user.id });
      if (blocked && blocked.guilds.includes(guild.id)) {
        created.addFields({ name: `Blocked Guild:`, value: `Guild was already blocked from using interactions so I left.` })
        await guild.leave();
      } else {
        let doc = await guildSchema.findOne({ guildID: guild.id });
        if (!doc) {
          await guildSchema
            .create({
              guildID: guild.id,
              guildName: guild.name,
              guildOwnerID: guild.ownerId,
              guildOwner: ownerTag,
            })
            .then((m) => m.save());
        }
        if (devChan) {
          devChan.send({ embeds: [created] });
        } else guild.systemChannel.send({ embeds: [created] });
      }
    } else {
      if (devChan) {
        devChan.send({ embeds: [created] });
      } else
        client.guilds.cache.get(DevGuild).systemChannel.send({ embeds: [created] });
    }

  },
};
