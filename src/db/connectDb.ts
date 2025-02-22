import mongoose from "mongoose";
import { getDbConfig } from "./config.ts";

let isConnected: boolean = false;

export async function connectDb() {
  if (isConnected) {
    return;
  }

  const config = getDbConfig();

  try {
    console.log("Connecting to DB with url: ", config.url);
    await mongoose.connect(config.url);
    isConnected = true;
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB: ", error);
  }
}
