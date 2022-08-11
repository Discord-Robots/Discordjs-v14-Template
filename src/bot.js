require("dotenv/config");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const chalk = require("chalk");
const { BotToken } = process.env;

class BudBot extends Client {
  constructor() {
    super({
      intents: require("./config.json").intents,
      partials: require("./config.json").partials,
    });

    this.config = require("./config.json");
    this.commands = new Collection();
    this.cooldowns = new Collection();
    this.commandArray = [];
    this.chalk = chalk;
    this.token = BotToken;
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
}

module.exports = BudBot;
