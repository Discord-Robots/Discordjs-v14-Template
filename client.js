require("dotenv/config");
const Bot = require("./src/Structures/bot.js");
const client = new Bot();

client.start();
