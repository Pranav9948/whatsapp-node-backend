import express from "express";
import cors from "cors";
import whatsappRoutes from "./routes/whatsapp.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

import { replyMessageStorage } from "./controllers/whatsappControllers.js";

import ProcessedMessage from "./models/ProcessedMessage.js";

import connectDB from "./db/db.js";

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
  const bodyParam = req.body;
  console.log(JSON.stringify(bodyParam, null, 2));

  if (bodyParam.object) {
    const entry = bodyParam.entry && bodyParam.entry[0];
    const change = entry && entry.changes && entry.changes[0];
    const value = change && change.value;

    if (!value) {
      return res.status(400).send("Invalid payload structure");
    }

    // Check if it's a message
    if (value.messages && value.messages[0]) {
      const phoneNumberId = value.metadata.phone_number_id;
      const from = value.messages[0].from; // Sender's phone number
      const msgBody = value.messages[0].text.body; // Message text
      const messageType = value.messages[0].type; // Message type

      const messageId = value.messages[0].id;

      console.log("Incoming message:", msgBody);

      const existingMessage = await ProcessedMessage.findOne({ messageId });

      if (existingMessage) {
        console.log(`Duplicate message ignored: ${messageId}`);
        return res.status(200).send("Duplicate message ignored");
      }

      const newProcessedMessage = new ProcessedMessage({
        messageId,
        senderId: from,
        hasReceivedWelcomeMessage: true,
      });
      await newProcessedMessage.save();

      const response = await replyMessageStorage(msgBody, "User", from,messageType);

      console.log("response here in post webhook", response);
    }

    // Check if it's a status update
    if (value.statuses && value.statuses[0]) {
      const status = value.statuses[0].status;
      const timestamp = value.statuses[0].timestamp;
      const recipientId = value.statuses[0].recipient_id;

      console.log(`Message to ${recipientId} is now ${status} at ${timestamp}`);
      return res.status(200).send("Status update received");
    }

    // If no recognizable event type
    return res.status(400).send("Unrecognized event type");
  }

  res.status(404).send("Invalid request");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
