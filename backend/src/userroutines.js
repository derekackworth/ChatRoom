const moment = require("moment");

const getTime = () =>
{
  return new Promise(resolve =>
  {
    resolve(moment().format("h:mm:ss a"));
  });
};

const getAllRooms = io =>
{
  return new Promise(async function(resolve)
  {
    let roomList = [];
    roomList.push("MAIN");
    let socketIDs = await getAllSocketIDs(io);

    await socketIDs.forEach(function(socketID)
    {
      if (!roomList.includes(String(io.nsps["/"].connected[socketID].roomName).toUpperCase()) &&
        io.nsps["/"].connected[socketID].roomName)
      {
        roomList.push(String(io.nsps["/"].connected[socketID].roomName).toUpperCase());
      }
    });

    resolve(roomList);
  });
};

const getAllSocketIDs = io =>
{
  return new Promise((resolve, reject) =>
  {
    io.of("/").clients((error, socketIDs) =>
    {
      if (error)
      {
        return reject(error);
      }

      resolve(socketIDs);
    });
  });
};

const getAllSockets = io =>
{
  return new Promise(async function(resolve)
  {
    class Socket
    {
      constructor(chatName, roomName, color)
      {
        this.chatName = chatName;
        this.roomName = roomName;
        this.color = color;
      }
    }

    let socketIDs = await getAllSocketIDs(io);
    let sockets = [];

    await socketIDs.forEach(function(socketID)
    {
      if (io.nsps["/"].connected[socketID].chatName)
      {
        sockets.push(new Socket(
          io.nsps["/"].connected[socketID].chatName,
          io.nsps["/"].connected[socketID].roomName,
          io.nsps["/"].connected[socketID].color)
        );
      }
    });

    resolve(sockets);
  });
};

const checkIfUserExists = (io, chatName) =>
{
  return new Promise(async function(resolve)
  {
    let socketIDs = await getAllSocketIDs(io);

    if (chatName.toUpperCase() === "ADMIN")
    {
      resolve(true);
    }

    await socketIDs.forEach(function(socketID)
    {
      if (String(io.nsps["/"].connected[socketID].chatName).toUpperCase() === chatName.toUpperCase() &&
        io.nsps["/"].connected[socketID].chatName)
      {
        resolve(true);
      }
    });

    resolve(false);
  });
};

module.exports =
{
  getTime,
  getAllRooms,
  getAllSocketIDs,
  getAllSockets,
  checkIfUserExists
};
