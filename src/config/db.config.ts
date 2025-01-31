import mongoose from "mongoose";
import { config } from "./app.config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB connected successfully 🟢");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
