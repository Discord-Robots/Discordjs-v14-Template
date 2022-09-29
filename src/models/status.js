const { Schema, model } = require("mongoose");

const status = new Schema({
    client_id: { type: String },
    status: { type: String }
})

module.exports = model("status", status, "status");