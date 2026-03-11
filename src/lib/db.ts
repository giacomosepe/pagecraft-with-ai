import mongoose from "mongoose";

const MONGODB_URI =
  (typeof import.meta !== "undefined" && import.meta.env?.MONGODB_URI) ||
  process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI as string);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
