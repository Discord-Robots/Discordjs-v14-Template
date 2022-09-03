const { Schema, model } = require("mongoose");

const blocked = new Schema({
    client_id: { type: String },
    guilds: [Object]
})

module.exports = model("blocked", blocked, "blocks");