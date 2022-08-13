require("dotenv/config");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const chalk = require("chalk");
const { BotToken } = process.env;
const Util = require("./Utils");

class BudBot extends Client {
  constructor() {
    super({
      intents: require("./config.json").intents,
      partials: require("./config.json").partials,
    });

    this.config = require("./config.json");
    this.utils = new Util(this);
    this.setMaxListeners(0);

    this.events = new Collection();
    this.commands = new Collection();
    this.buttons = new Collection();
    this.modals = new Collection();
    this.selectMenus = new Collection();
    this.autoCompletes = new Collection();
    this.contextMenus = new Collection();
    this.cooldowns = new Collection();

    this.commandArray = [], this.developerArray = [];
    this.chalk = chalk;
    this.token = BotToken;
    this.color = 0x22b14c;
    this.rds = readdirSync;
  }

  async start(token) {
    if (process.env.WebhookURL) {
      require("./antiCrash")(this);
      console.log("Webhook Client Connected!");
    }
    const functionFolders = readdirSync(`./src/functions`);
    for (const folder of functionFolders) {
      const functionFiles = readdirSync(`./src/functions/${folder}`).filter(
        (file) => file.endsWith(".js")
      );
      for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(this);
    }

    this.handleEvents();
    this.handleCommands();
    this.login(token);
  }

  reload() {
    console.log(`\nReloading Commands and Events`)
    this.commands.clear()
    this.commandArray = [], this.developerArray = [];
    for (const [key, value] of this.events) this.removeListener(key, value)
    this.handleEvents();
    this.handleCommands();
  }
}

module.exports = BudBot;
