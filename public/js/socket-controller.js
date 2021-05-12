var socket = io();

function socketUserJoin(username) {
    socket.emit("user-join", username)
}

function socketSendEmoji(msg) {
    socket.emit("message", msg);
}

socket.on('user-join', function(msg) {
    refreshUser(msg)
});

socket.on('message', function(msg) {
    refreshChat(msg)
});