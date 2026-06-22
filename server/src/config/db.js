const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("MongoDB URI not found. Add MONGO_URI in .env file.");
      return;
    }

    // Safeguard for serverless environments (Vercel)
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // In serverless environment, do not kill the process
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

module.exports = connectDB;