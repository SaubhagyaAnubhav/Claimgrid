const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");
const seedGrid = require("./utils/seedGrid");
const gridSocket = require("./sockets/gridSocket");

// Sanitize CLIENT_URL (strip trailing slash for exact CORS matching)
let clientOrigin = process.env.CLIENT_URL || "*";
if (clientOrigin !== "*" && clientOrigin.endsWith("/")) {
  clientOrigin = clientOrigin.slice(0, -1);
}

// ─── HTTP + Socket.IO server ──────────────────────────────────────────────────
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    methods: ["GET", "POST"],
  },
});

// Attach socket logic
gridSocket(io);

// ─── Connect DB → seed grid → start server ────────────────────────────────────
const PORT = process.env.PORT || 5001;

const start = async () => {
  await connectDB();
  await seedGrid();          // seeds only if collection is empty

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();