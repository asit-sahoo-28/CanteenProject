import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Client connected");

    // Admin joins room
    socket.on("join_admin", () => {
      socket.join("admin");
      console.log("👨‍💼 Admin joined");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};