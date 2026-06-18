import { io } from "socket.io-client";

// Create socket but do NOT auto-connect — we connect manually after user joins
const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5001", {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

export default socket;
