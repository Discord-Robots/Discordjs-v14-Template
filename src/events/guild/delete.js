const { Guild, Client, EmbedBuilder } = require("discord.js");
const { DevChannel } = process.env;
const guildSchema = require("../../models/guild");


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
    const ownerTag = guild.members.cache.get(guild.ownerId).user.tag;

    const deleted = new EmbedBuilder({
      title: `Removal from Guild`,
      description: `I have been removed from guild: \n${guild.name} (${guild.id}).`,
      thumbnail: {
        url: `${guild.iconURL({ dynamic: true })}`
      },
      footer: {
        text: `${client.user.tag}`,
        iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`
      }
    }).setTimestamp()
    devChan.send({
      embeds: [deleted]
    });

    let doc = await guildSchema.findOne({ guildID: guild.id })
    if (doc) {
      await guildSchema.deleteOne({
        guildID: guild.id,
      });
    }
  },
};
