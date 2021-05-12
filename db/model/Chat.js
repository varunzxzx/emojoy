const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  body: "String",
  from: "String"
});
const Chat = mongoose.model("Chat", schema);

module.exports = Chat;
