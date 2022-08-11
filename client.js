require("dotenv/config");
const Bot = require("./src/bot.js");
const client = new Bot();

client.start();
