import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true, unique: true }, 
    messageIds: { type: [String], default: [] },
    hasReceivedWelcomeMessage: { type: Boolean, default: false }, 
  },
  { timestamps: true } 
);

const User = mongoose.model("User", userSchema);

export default User;
