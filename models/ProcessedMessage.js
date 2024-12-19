import mongoose from "mongoose";

const processedMessageSchema = new mongoose.Schema(
    {
      messageId: { type: String, required: true, unique: true },
      senderId: { type: String, required: true },
      hasReceivedWelcomeMessage: { type: Boolean, default: false }, 
      timestamp: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
  
  const ProcessedMessage = mongoose.model("ProcessedMessage", processedMessageSchema);



  export default ProcessedMessage;