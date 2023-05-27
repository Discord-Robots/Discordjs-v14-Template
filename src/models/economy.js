const { Schema, model } = require("mongoose");

module.exports = model("Economy", new Schema({
    guildID: String,
    guildName: String,
    userID: String,
    userName: String,
    wallet: String,
    bank: String,
}), "Economy");