require("dotenv/config");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const chalk = require("chalk");
const { BotToken } = process.env;
const Util = require("./Utils");
const glob = require("glob");

class BOT extends Client {
  constructor() {
    super({
      intents: 3276799,
      partials: require("./config.json").partials,
    });

    this.config = require("./config.json");
    this.utils = new Util(this);
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
    this.chalk = chalk;
    this.token = BotToken;
    this.color = 0x22b14c;
    this.rds = readdirSync;
    this.color2 = {
      main: 0x13ef8e,
    };
  }

  async start(token) {
    if (process.env.WebhookURL) {
      require("./antiCrash")(this);
      console.log("[WEBHOOK] - Webhook Client Connected!");
    }
    const functionFolders = readdirSync(`./src/functions`);
    for (const folder of functionFolders) {
      const functionFiles = readdirSync(`./src/functions/${folder}`).filter(
        (file) => file.endsWith(".js")
      );
      for (const file of functionFiles)
        require(`../functions/${folder}/${file}`)(this);
    }
    // this.handleLegacyCommands();
    this.handleCommands();
    this.handleComponents();
    this.handleEvents();
    this.login(token);
  }
}

module.exports = BOT;
