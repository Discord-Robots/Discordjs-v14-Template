const Guild = require("../models/guild");

module.exports = class Utils {
  constructor(client) {
    this.client = client;
  }

  async guild(guildID, guildName) {
    const guild = await Guild.findOne({
      guildID: guildID,
    });
    if (!guild) {
      const newData = new Guild({
        guildID,
        guildName,
      });
      newData.save();
      return newData;
    } else {
      return guild;
    }
  }

  async getSetup(guildID, guildName) {
    const setup = await Guild.findOne({
      guildID,
      guildName,
    });
    return setup;
  }

  async wait(time) {
    const wait = require("node:timers/promises").setTimeout;
    await wait(time);
  }

  capitalise(string) {
    return string
      .split(" ")
      .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
      .join(" ");
  }

  eventCapitalise(string) {
    return string
      .split(" ")
      .map((str) => str.slice(0, 1).toLowerCase() + str.slice(1))
      .join(" ");
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }

  checkOwner(user) {
    return process.env.BotOwnerID !== user;
  }

  errorEmbed(message, channel) {
    channel.send({
      embeds: [
        {
          description: `\\📛 **Error:** \\📛\n ${message} `,
          color: 0xfc0303,
        },
      ],
    });
  }

  successEmbed(message, channel) {
    channel.send({
      embeds: [
        {
          description: `\\✅ **Success:** \\✅\n ${message}  `,
          color: 0x13ad0e,
        },
      ],
    });
  }

  async errorEditEmbed(message, interaction) {
    await interaction.editReply({
      embeds: [
        {
          description: `\\📛 **Error:** \\📛\n ${message}`,
          color: 0xfc0303,
        },
      ],
    });
  }

  async successEditEmbed(message, interaction) {
    await interaction.editReply({
      embeds: [
        {
          description: `\\✅ **Success:** \\✅\n ${message}`,
          color: 0x13ad0e,
        },
      ],
    });
  }

  async errorReplyEmbed(message, interaction) {
    await interaction.reply({
      embeds: [
        {
          description: `\\📛 **Error:** \\📛\n ${message}`,
          color: 0xfc0303,
        },
      ],
    });
  }

  async successReplyEmbed(message, interaction) {
    await interaction.reply({
      embeds: [
        {
          description: `\\✅ **Success:** \\✅\n ${message}`,
          color: 0x13ad0e,
        },
      ],
    });
  }
};
