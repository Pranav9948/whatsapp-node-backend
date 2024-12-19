import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then(() => {
          console.log("MongoDB connected successfully!");
        })
        .catch((err) => {
          console.error("MongoDB connection error:", err);
        });
      console.log(colors.bgYellow("MongoDB Connected"));
    } catch (err) {
      console.error("Error connecting to MongoDB:", err.message);
      process.exit(1); // Exit the process with failure
    }
  };

  export default connectDB;