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
  BookingCancellationTemplate,
  BookingConfirmationTemplate,
  getWelcomeMessageTemplate,
  replyMessageStorage,
  sendMessage,getSenderandMessageDetails
} from "./Helpers/WhatsappHelper.js";
import {
  getReplyToCustomer,
  getTemplateMissingCustomer,
  sendQuickReplyButtonMessages,
} from "./controllers/whatsappControllers.js";

const app = express();
const PORT = process.env.PORT || 8500;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

// Connect to MongoDB
connectDB();

const myToken = process.env.MYTOKEN;
const processedMessages = {};

const requiredFields = [
  "- Package Name:",
  "- Check-in Date:",
  "- Check-out Date:",
  "- Number of Rooms:",
  "- Room Type:",
  "- Adults:",
  "- Children:",
  "- Toddlers:",
  "- Infants:",
  "- Total Price:",
];

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

    const { from: senderId, type: messageType, id: messageId } = messages[0];

    let msgBody = null;
    if (messageType === "text") {
      msgBody = messages[0]?.text?.body;
    } else if (messageType === "button") {
      msgBody = messages[0]?.button?.payload;
    }

    console.log("Message ID:", messageId);
    console.log("Incoming message:", msgBody);

    const existingUser = await User.findOne({ senderId });

    if (existingUser) {
      console.log("User exists:", existingUser);

      // Check if the messageId is already in the messageIds array
      if (existingUser.messageIds.includes(messageId)) {
        console.log(
          "Message ID already exists for this user. No further actions will be taken."
        );
        return res.status(200).send("Message ID already exists"); // Respond to the client
      }

      // Add the new messageId if it doesn't already exist
      existingUser.messageIds.push(messageId);
      await existingUser.save();
      console.log("New message ID added for existing user:", existingUser);

      if (!msgBody) {
        console.error("Message body is undefined.");
        return res.status(400).send("Message body is undefined");
      }

      if (msgBody.trim().toLowerCase() === "confirm booking") {
        const responseTemplate = await BookingConfirmationTemplate(senderId,msgBody);

        console.log("responseTemplate", responseTemplate);

        const completedResponse = await sendMessage(responseTemplate);

        return res.status(200).send("Confirmation message sent successfully");
      }

      // Handle "Cancel Inquiry" message
      if (msgBody.trim().toLowerCase() === "cancel inquiry") {
        const responseTemplate = await BookingCancellationTemplate(senderId,msgBody);

        console.log("responseTemplate", responseTemplate);

        const completedResponse = await sendMessage(responseTemplate);

        return res.status(200).send("Cancellation message sent successfully");
      }

      // Analyzing message content

      const interestPattern = /^Hello, I am interested in booking/i;

      // Step 2: Check if all required fields are present
      const hasAllDetails = (msgBody) =>
        requiredFields.every((field) => msgBody.includes(field));

      if (interestPattern.test(msgBody)) {
        // Scenario 1: All required fields are present
        if (hasAllDetails(msgBody)) {
          console.log("Detected Scenario 1: All Details Filled");

          await getReplyToCustomer(req,res,senderId,msgBody)

          return res.status(200).send("Message sent successfully");
        } else {
          // Scenario 2: Missing Details
          console.log("Detected Scenario 2: Missing Details");

          await getTemplateMissingCustomer(req,res,senderId,msgBody);

          return res.status(200).send("Message sent successfully");
        }
      } else {
        
        console.log("No condition matched...");
      }

      // Handle reply logic for existing users
      const response = await replyMessageStorage(
        msgBody,
        "User",
        senderId,
        messageType
      );
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
    const responseTemplate = getWelcomeMessageTemplate(senderId, "User");
    const completedResponse = await sendMessage(responseTemplate);
    console.log("Welcome message sent to new user:", completedResponse);
  
    // Check for "Scenario 1" or "Scenario 2" based on msgBody
    const interestPattern = /^Hello, I am interested in booking/i;
  
    // Step 2: Check if all required fields are present
    const hasAllDetails = (msgBody) =>
      requiredFields.every((field) => msgBody.includes(field));
  
    if (interestPattern.test(msgBody)) {
      // Scenario 1: All required fields are present
      if (hasAllDetails(msgBody)) {
        console.log("Detected Scenario 1: All Details Filled");
  
        await getReplyToCustomer(req, res, senderId, msgBody);
  
        return res.status(200).send("Scenario 1 message sent successfully");
      } else {
        // Scenario 2: Missing Details
        console.log("Detected Scenario 2: Missing Details");
  
        await getTemplateMissingCustomer(req, res, senderId, msgBody);
  
        return res.status(200).send("Scenario 2 message sent successfully");
      }
    } else {
      console.log("Message does not match any scenario.");
    }
  
    // Respond to the client
    return res.status(200).send("New user processed successfully");
      
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


export default app;
