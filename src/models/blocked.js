const { Schema, model } = require("mongoose");

const blocked = new Schema({
    client_id: { type: String },
    guilds: [String]
})

module.exports = model("blocked", blocked, "blocks");