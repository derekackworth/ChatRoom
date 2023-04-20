const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const port = process.env.PORT || 5000;
const userRoutines = require("./userroutines");
const colors = require("./colors.json");

let server = http.createServer(app);
let io = socketIO(server);
app.enable("trust proxy");

app.use(function(req, res, next)
{
  if (req.secure)
  {
    next();
  }
  else
  {
    res.redirect("https://" + req.headers.host + req.url);
  }
});

app.use(express.static("public"));
app.get("/", (req, res) => res.send());

io.on("connection", socket =>
{
  socket.on("rooms", async () =>
  {
    let rooms = await userRoutines.getAllRooms(io);
    socket.emit("rooms", rooms);
  });

  socket.on("namechange", async clientData =>
  {
    let message = "";

    if (await userRoutines.checkIfUserExists(io, clientData.chatName))
    {
      message = "Username already exists";
    }
    else
    {
      if (!clientData.chatName.replace(/\s/g, '').length)
      {
        message = "Enter a username";
      }
    }

    socket.emit("namechange", message);
  });

  socket.on("login", async clientData =>
  {
    socket.chatName = clientData.chatName;
    socket.roomName = clientData.roomName.toUpperCase();
    socket.color = colors[Math.floor(Math.random() * colors.length) + 1];
    let time = await userRoutines.getTime();

    let message =
    {
      from: "Admin",
      room: socket.roomName,
      text: `Welcome ${ socket.chatName }`,
      id: socket.id,
      color: "#283593",
      time: time
    };

    socket.join(socket.roomName);
    socket.emit("welcome", message);

    message =
    {
      from: "Admin",
      room: socket.roomName,
      text: `${ socket.chatName } has joined the ${ socket.roomName } room`,
      id: socket.id,
      color: "#283593",
      time: time
    };

    socket.to(socket.roomName).emit("message", message);
  });

  socket.on("disconnect", async () =>
  {
    let time = await userRoutines.getTime();

    let message =
    {
      from: "Admin",
      room: socket.roomName,
      text: `${ socket.chatName } has left the ${ socket.roomName } room`,
      id: socket.id,
      color: "#283593",
      time: time
    };

    socket.to(socket.roomName).emit("message", message);
  });

  socket.on("message", async clientData =>
  {
    let time = await userRoutines.getTime();

    let message =
    {
      from: socket.chatName,
      room: socket.roomName,
      text: clientData.text,
      id: socket.id,
      color: socket.color,
      time: time
    };

    io.in(socket.roomName).emit("message", message);
  });

  socket.on("whosonlinedialog", async () =>
  {
    let sockets = await userRoutines.getAllSockets(io);
    socket.emit("whosonlinedialog", sockets);
  });

  socket.on("changeroom", async clientData =>
  {
    socket.roomName = clientData.roomNameChange.toUpperCase();
    let time = await userRoutines.getTime();

    let message =
    {
      from: "Admin",
      room: socket.roomName,
      text: `Welcome ${ socket.chatName }`,
      id: socket.id,
      color: "#283593",
      time: time
    };

    socket.join(socket.roomName);
    socket.emit("welcome", message);

    message =
    {
      from: "Admin",
      room: socket.roomName,
      text: `${ socket.chatName } has joined the ${ socket.roomName } room`,
      id: socket.id,
      color: "#283593",
      time: time
    };

    socket.to(socket.roomName).emit("message", message);
  });

  socket.on("typing", async () =>
  {
    let message = `${ socket.chatName } is typing`;
    socket.to(socket.roomName).emit("typing", message);
  });
});

server.listen(port, () => console.log(`Started on port ${ port }`));
