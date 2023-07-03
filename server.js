const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

// Create server HTTP
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:2407",
    methods: ["GET", "POST"],
  },
});

const users = [];

// Listen connections client
io.on("connection", (socket) => {
  const { id } = socket;
  if (!users.find((user) => user === id)) {
    users.push(id);
  }

  console.log("Client connected " + id);
  messageConnection = "New user connected";
  io.emit("message", messageConnection);

  sendMessageToSocket(id, "Welcome to we chat!");

  // Listen events from client
  socket.on("sendMessage", (data) => {
    console.log(id + " Received data:", data);

    // Sent data all connections
    let message;
    users.forEach((user, index) => {
      if (id == user) {
        message = `User ${index + 1}: ${data}`;
      }
    });
    io.emit("message", message);
  });

  // Client disconnect
  socket.on("disconnect", () => {
    console.log("Clients disconnected " + id);
  });
});

const port = 3223;
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Sent email all client for 5 seconds
let count = 0;

// setInterval(() => {
//   let message = "Ok! Gaming Bedroom! " + count;
//   count += 1;
//   io.emit("message", message);
// }, 5000);

function sendMessageToSocket(socketId, message) {
  io.to(socketId).emit("message", message);
}
