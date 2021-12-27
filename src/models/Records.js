const Mongoose = require("mongoose");

const RecordsSchema = new Mongoose.Schema({});

const Records = Mongoose.model("Record", RecordsSchema, "records");

module.exports = Records;
