require("dotenv/config");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { BotToken, Prefix } = process.env;
const Util = require("./Utils");
const chalk = require("chalk");

class BOT extends Client {
  constructor() {
    super({
      intents: 3276799,
      partials: require("./config.json").partials,
    });

    this.config = require("./config.json");
    this.setMaxListeners(0);
    this.events = new Collection();

    this.legacyCommands = new Collection();
    this.aliases = new Collection();

    this.commands = new Collection();
    this.buttons = new Collection();
    this.modals = new Collection();
    this.selectMenus = new Collection();

    this.cooldowns = {
      legacyCommands: new Collection(),
      buttons: new Collection(),
      commands: new Collection(),
      modals: new Collection(),
      selectMenus: new Collection(),
    };

    (this.commandArray = []), (this.developerArray = []);
    this.legacyArray = [];
    this.token = BotToken;
    this.colors = {
      green: 0x22b14c,
    };
    global.rds = readdirSync;
    global.chalk = chalk;
    global.utils = new Util(this);

  }

  async start(token) {
    this.login(token).then(async () => {
      const functionFolders = readdirSync(`./src/functions`);
      for (const folder of functionFolders) {
        const functionFiles = readdirSync(`./src/functions/${folder}`).filter(
          (file) => file.endsWith(".js")
        );
        for (const file of functionFiles)
          require(`../functions/${folder}/${file}`)(this);
      }
      await utils.logger();
      this.handleCommands();
      this.handleComponents();
      this.handleEvents();
      if (Prefix)
        this.handleLegacyCommands();
    });
  }
}

module.exports = BOT;
