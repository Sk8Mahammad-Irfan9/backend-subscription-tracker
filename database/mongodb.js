import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define MONGODB_URI enviroment variable inside .env.development.local"
  );
}

const connecToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to DB in ${NODE_ENV} mode`);
  } catch (error) {
    console.log(`Error connecting to database`, error);
  }
};

export default connecToDatabase;
