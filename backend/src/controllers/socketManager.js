import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

const connetToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("SOMETHING IS CONNECTED FOR SURE");

    //listing to the join call event
    socket.on("join-call", (path) => {
      console.log(`User with id ${socket.id} joined the room ${path}`);
      if (connections[path] === undefined) {
        connections[path] = [];
      }

      //here we are pushing every user to the room
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      //here we are sending the user the list of all the users in the room
      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path]
        );
      }

      //here we are sending the user the list of all the messages in the room
      if (messages[path] !== undefined) {
        for (let a = 0; a < messages[path].length; ++a) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][a]["data"],
            messages[path][a]["sender"],
            messages[path][a]["socket-id-sender"]
          );
        }
      }
    });

    socket.on("signal", (toId, message) => {
      //here we are sending the signal to the user with the id toId in the room of the user with the id socket.id
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      //here we are detecting the room of the user where the msg came
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false]
      );

      if (found == true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }

        //here we are pushing the message to the room
        messages[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": socket.id,
        });

        console.log("message", matchingRoom, ":", data, sender);

        //here we are sending the message to all the users in the room
        connections[matchingRoom].forEach((element) => {
          io.to(element).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      let diffTime = Math.abs(timeOnline[socket.id] - new Date());

      let key;
      //here we are detecting the room of the user where the msg came
      for (const [room, person] of JSON.parse(
        JSON.stringify(Object.entries(connections))
      )) {
        //here we are detecting the user in the room
        for (let i = 0; i < person.length; ++i) {
          //user detected
          if (person[i] === socket.id) {
            key = room;
            //here we are sending the user that the user with the id socket.id left the room
            for (let a = 0; a < connections[key].length; ++a) {
              io.to(connections[key][a]).emit("user-left", socket.id);
            }

            //here we are deleting the user from the room
            let index = connections[key].indexOf(socket.id);
            connections[key].splice(index, 1);

            //here we are deleting the room if the room is empty
            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });
  return io;
};

export default connetToSocket;
