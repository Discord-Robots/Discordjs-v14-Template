require("dotenv/config");
const { Client, Collection, Partials } = require("discord.js");
const {
  Channel,
  GuildMember,
  GuildScheduledEvent,
  Message,
  Reaction,
  ThreadMember,
  User,
} = Partials;
const { readdirSync } = require("fs");
const { BotToken, Prefix } = process.env;
const Util = require("./Utils");
const chalk = require("chalk");

class BOT extends Client {
  constructor() {
    super({
      intents: 3276799,
      partials: [
        Channel,
        GuildMember,
        GuildScheduledEvent,
        Message,
        Reaction,
        ThreadMember,
        User,
      ],
    });
    this.token = BotToken;
    this.config = require("./config.json");
    this.setMaxListeners(0);
    this.events = new Collection();
    this.legacyCommands = new Collection();
    this.aliases = new Collection();
    this.commands = new Collection();
    this.components = {
      buttons: new Collection(),
      modals: new Collection(),
      selectMenus: new Collection(),
    };
    this.cooldowns = {
      legacyCommands: new Collection(),
      buttons: new Collection(),
      commands: new Collection(),
      modals: new Collection(),
      selectMenus: new Collection(),
    };
    (this.commandArray = []), (this.developerArray = []);
    this.legacyArray = [];
    this.colors = {
      green: 0x22b14c,
    };
    this.rds = readdirSync;
    global.chalk = chalk;
    this.utils = new Util(this);
  }

  async start(token) {
    const functionFolders = this.rds(`./src/functions`);
    for (const folder of functionFolders) {
      const functionFiles = this.rds(`./src/functions/${folder}`).filter(
        (file) => file.endsWith(".js")
      );
      for (const file of functionFiles)
        require(`../functions/${folder}/${file}`)(this);
    }
    this.handleEvents();
    this.login(token).then(async () => {
      await this.utils.logger();
      this.handleCommands();
      this.handleComponents();
      if (Prefix) this.handleLegacyCommands();
    });
  }
}

module.exports = BOT;
