const Chat = require("../model/Chat");

async function saveChat(message) {
    const newChat = new Chat(message);
    newChat.save(function (err) {
      if (err) throw err;
      console.log("Chat saved in the DB");
    });
}

async function readChat(cb) {
    const messages = await Chat.find({}, cb)
    return messages;
}

module.exports = { saveChat, readChat };
