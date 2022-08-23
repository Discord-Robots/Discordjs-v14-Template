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

    this.cooldowns = new Collection();
    this.componentCooldowns = {
      buttons: new Collection(),
      selectMenus: new Collection(),
      modals: new Collection()
    };

    (this.commandArray = []), (this.developerArray = []);
    this.chalk = chalk;
    this.token = BotToken;
    this.color = 0x22b14c;
    this.rds = readdirSync;
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
        require(`./functions/${folder}/${file}`)(this);
    }
    this.handleCommands();
    this.handleComponents();
    this.handleEvents();
    this.login(token);
  }

  async reload() {
    this.commands.sweep(() => true);
    glob(`${__dirname}/commands/**/*.js`, async (err, filePaths) => {
      if (err) return console.error();
      filePaths.forEach((file) => {
        delete require.cache[require.resolve(file)];

        const pull = require(file);

        if (pull.data.name && pull.developer)
          this.commands.set(pull.data.name, pull);
      });
    });
  }
}

module.exports = BOT;
