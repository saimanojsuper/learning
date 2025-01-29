//index.js
const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
let usersTyping = [];

//Add this before the app.get() block
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("isTyping", (data) => {
    const isUserPresent = usersTyping.filter(
      (user) => user.socketID === socket.id
    );

    if (data.isTyping && isUserPresent.length == 0) {
      usersTyping.push(data);
    } else if (!data.isTyping) {
      usersTyping = usersTyping.filter((user) => user.socketID !== socket.id);
    }

    socketIO.emit("typingUsers", usersTyping);
  });

  socket.on("newUser", (data) => {
    users.push(data);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
  });

  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
