const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");
const mongoose = require("mongoose");

const env = process.env.NODE_ENV || "development";
const envConfig = require("./server/env")[env];
const { saveUser } = require("./db/controller/user");
const { saveChat, readChat } = require("./db/controller/chat");

app.use(cors());
app.use(express.static(__dirname + "/public"));

require("./server/routes")(app);

let users = [], messages = []

io.on('connection', (socket) => {
  const id = socket.id;

  // Handle User joining
  socket.on('user-join', (username) => {
    if(!users.find(u => u.username === username)) {
      const user = {
        username: username,
        socketId: socket.id,
        id: socket.id
      };
      users.push(user);
      saveUser(user);
    }
    io.emit('user-join', users);
    socket.emit("message", messages)
  });

  // Handle New Message
  socket.on("message", (msg) => {
    messages.push(msg)
    io.emit("message", messages)
    saveChat(msg)
  })

  // Handle User log-off
  socket.on('disconnect', () => {
    users.splice(users.findIndex(u  => u.socketId === id), 1);
    io.emit('user-join', users);
  })
});

// Connect with DB, then start the server
mongoose.connect(envConfig.db).then(
  () => {
    // Initilise Messages
    readChat((err, res) => {
      if(err) throw err;
      server.listen(envConfig.port, function () {
        messages = res
        console.log("Server listening on port " + envConfig.port);
      });
    })
  },
  function (err) {
    throw err;
  }
);
