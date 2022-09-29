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
    this.token = BotToken;
    this.config = require("./config.json");
    this.setMaxListeners(0);
    this.events = new Collection();
    global.legacyCommands = new Collection();
    global.aliases = new Collection();
    global.commands = new Collection();
    global.components = {
      buttons: new Collection(),
      modals: new Collection(),
      selectMenus: new Collection(),
    }
    global.cooldowns = {
      legacyCommands: new Collection(),
      buttons: new Collection(),
      commands: new Collection(),
      modals: new Collection(),
      selectMenus: new Collection(),
    };
    (global.commandArray = []), (global.developerArray = []);
    global.legacyArray = [];
    global.colors = {
      green: 0x22b14c,
    };
    global.rds = readdirSync;
    global.chalk = chalk;
    global.utils = new Util(this);
  }

  async start(token) {
    const functionFolders = readdirSync(`./src/functions`);
    for (const folder of functionFolders) {
      const functionFiles = readdirSync(`./src/functions/${folder}`).filter(
        (file) => file.endsWith(".js")
      );
      for (const file of functionFiles)
        require(`../functions/${folder}/${file}`)(this);
    }
    this.handleEvents();
    this.login(token).then(async () => {
      await utils.logger();
      this.handleCommands();
      this.handleComponents();
      if (Prefix)
        this.handleLegacyCommands();
    });
  }
}

module.exports = BOT;
