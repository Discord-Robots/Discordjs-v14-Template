const { Schema, model } = require("mongoose")

const Guild = new Schema({

    guildID: { type: String },
    guildName: { type: String },

});

module.exports = model("Guild", Guild, "Guild");