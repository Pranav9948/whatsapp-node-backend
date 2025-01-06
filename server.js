import express from "express";
import cors from "cors";
import whatsappRoutes from "./routes/whatsapp.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";


import User from "./models/userSchema.js";

import connectDB from "./db/db.js";
import {
  getWelcomeMessageTemplate,
  replyMessageStorage,
  sendMessage,
} from "./Helpers/WhatsappHelper.js";

const app = express();
const PORT = process.env.PORT || 8500;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

// Connect to MongoDB
connectDB();

const myToken = process.env.MYTOKEN;
const processedMessages = {};

app.use("/api/whatsapp", whatsappRoutes);

app.get("/", (req, res) => {
  res.send("whatsapp backend integration testing....");
});

app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    console.log("mode".america, mode, token, myToken);
    if (mode === "subscribe" && myToken === token) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});


app.post("/webhook", async (req, res) => {
  const { body: bodyParam } = req; 
  console.log(JSON.stringify(bodyParam, null, 2));

  // Check if the request contains the expected object
  if (!bodyParam.object) {
    return res.status(404).send("Invalid request");
  }

  const entry = bodyParam.entry?.[0];
  const change = entry?.changes?.[0];
  const value = change?.value;

  if (!value) {
    return res.status(400).send("Invalid payload structure");
  }

 
  if (value.messages?.[0]) {
    const { phone_number_id: phoneNumberId, messages } = value;
    const { from: senderId, text: { body: msgBody }, type: messageType, id: messageId } = messages[0];

    console.log("Message ID:", messageId);
    console.log("Incoming message:", msgBody);


    const existingUser = await User.findOne({ senderId });

    if (existingUser) {
      console.log("User exists:", existingUser);

      // Check if the messageId is already in the messageIds array
      if (existingUser.messageIds.includes(messageId)) {
        console.log("Message ID already exists for this user. No further actions will be taken.");
        return res.status(200).send("Message ID already exists"); // Respond to the client
      }

      // Add the new messageId if it doesn't already exist
      existingUser.messageIds.push(messageId);
      await existingUser.save();
      console.log("New message ID added for existing user:", existingUser);

      // Handle reply logic for existing users
      const response = await replyMessageStorage(msgBody, "User", senderId, messageType);
      console.log("Response for existing user:", response);

    } else {
      // New user case
      console.log("New user detected. Creating user and sending welcome message.");

      const newUser = new User({
        senderId,
        messageIds: [messageId], // Initialize with the first messageId
        hasReceivedWelcomeMessage: true,
      });
      await newUser.save();
      console.log("New user created:", newUser);

      // Send the welcome message template 
      const responseTemplate = getWelcomeMessageTemplate(process.env.RECIPIENT_WAID, "User");
      const completedResponse = await sendMessage(responseTemplate);
      console.log("Welcome message sent to new user:", completedResponse);
    }


    if (messageType === "button") {

      console.log('button deteted...')
      const { button: { payload } } = message;
      console.log("Quick reply button clicked with payload:", payload);

      const response = await handleQuickReply(payload, senderId);
      console.log("Response for quick reply:", response);

      return res.status(200).send("Quick reply button processed successfully");
    }



    // Respond to the client
    return res.status(200).send("Webhook processed successfully");
  }

  // Check if it's a status update
  if (value.statuses?.[0]) {
    const { status, timestamp, recipient_id: recipientId } = value.statuses[0];
    console.log(`Message to ${recipientId} is now ${status} at ${timestamp}`);
    return res.status(200).send("Status update received");
  }

  // If no recognizable event type
  return res.status(400).send("Unrecognized event type");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
