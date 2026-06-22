# ClaimGrid — Real-Time Multiplayer Grid Game

ClaimGrid is a production-ready, real-time multiplayer grid game where players claim tiles on a shared board. Powered by WebSockets and MongoDB, the game ensures conflict-safe claim authorization and low-latency client updates. The user interface features a premium SaaS landing and join flow, inspired by clean modern application login designs.

---

##  Key Features

- **Real-Time Board Synchronization:** WebSocket-powered low-latency visual update propagation when any user claims a tile.
- **Conflict-Safe Claiming Engine:** Server-side synchronization checks prevent multiple players from claiming the same tiles simultaneously.
- **Premium SaaS Landing Screen:** Modern, minimal layout incorporating soft grid designs, navy-blue typography hierarchy, polished visual feedback cards, and custom graphics.
- **Interactive Color Selector:** Dropdown color-swatch selector showing Hex codes and dynamic rings/shadow offsets matching the selected color.
- **Live Board Preview:** A mini-preview grid rendering simulated claims alongside recent logs with automated pulsating updates.
- **Live Leaderboard & Stats Panel:** Track player scores, total claims, global tile status, and active sessions.
- **Fully Responsive & Accessible:** Designed to adapt to all viewports (from 1440px desktops to mobile screens) with semantic HTML attributes.

---

##  Technology Stack

### Frontend
- **React.js (v19):** Declarative component-based UI rendering.
- **Vite:** High-performance bundler with fast hot module replacement (HMR).
- **Tailwind CSS (v4):** Styling framework with modern utility structures.
- **Socket.io-Client:** WebSocket client implementation for state synchronization.
- **Axios:** For accessing JSON REST API endpoints.

### Backend
- **Node.js & Express:** Lightweight, robust REST APIs.
- **Socket.io:** State event broker handling bidirectional communication.
- **MongoDB & Mongoose (v9):** Persistent storage of grid boards and user claim data.
- **Nodemon:** Developer watcher tool.

---

##  Project Structure

```text
claimgrid/
├── client/                 # Frontend SPA (Vite + React)
│   ├── src/
│   │   ├── components/     # UI Components (JoinScreen, GridBoard, StatsPanel, Toast, etc.)
│   │   ├── hooks/          # Custom react hooks
│   │   ├── lib/            # REST API & Socket client connection helpers
│   │   ├── App.jsx         # App routing & core container logic
│   │   └── index.css       # Core styling & Tailwind imports
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Backend Node.js service
    ├── src/
    │   ├── config/         # MongoDB Mongoose configurations
    │   ├── controllers/    # API controllers for claims & leaderboards
    │   ├── models/         # Database Schemas (User.js, Grid.js)
    │   ├── routes/         # Express endpoint routing
    │   ├── sockets/        # Socket.io connection handlers and events
    │   ├── utils/          # Grid seeder utility functions
    │   └── server.js       # Main server entrypoint
    └── package.json
```

---

##  Configuration & Environment Setup

Before running the application, set up your local configuration variables:

### 1. Backend Environment Setup (`server/.env`)
Create a file named `.env` in the `server` folder:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/claimgrid
CLIENT_URL=http://localhost:5173
```

### 2. Frontend Environment Setup (`client/.env`)
Create a file named `.env` in the `client` folder:
```env
VITE_API_URL=http://localhost:5001
```

---

## 🛠️ Installation & Run Instructions

Ensure you have **Node.js** and **MongoDB** installed and running locally.

### Step 1: Run the Backend Server
Navigate to the `server/` directory, install the required packages, and start the development server:
```bash
cd server
npm install
npm run dev
```
The server will seed the grid database (if empty) and listen on `http://localhost:5001`.

### Step 2: Run the Frontend Client
Navigate to the `client/` directory, install packages, and start the Vite client:
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173` in your web browser.

### Step 3: Production Build
To create a optimized production build of the client application, run:
```bash
cd client
npm run build
```

---

##  REST API & WebSockets Reference

### REST API Endpoints
- `GET /api/grid` — Retrieves the current claim state of all tiles.
- `GET /api/users/leaderboard` — Retrieves the top player claims sorted in descending order.

### WebSocket Core Events
- `connection` — Initializes socket sessions and subscribes clients to grid updates.
- `claim-tile` — Emitted by clients attempting to claim a tile.
- `tile-update` — Broadcasted to all connected clients when a claim is validated.
