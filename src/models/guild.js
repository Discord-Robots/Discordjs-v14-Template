const { Schema, model } = require("mongoose")

const Guild = new Schema({

    guildID: { type: String },
    guildName: { type: String },
    guildOwner: { type: String },
    guildOwnerID: { type: String },

});

module.exports = model("Guild", Guild, "Guild");