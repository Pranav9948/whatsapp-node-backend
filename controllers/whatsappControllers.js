import colors from "colors";
import {
  getImageTemplatedMessage,
  sendMessage,
  getWelcomeMessageTemplate,
  getVideoMessageInput,
  travelDateTesting,
  getPackageDetailsInPdf,
  uploadMedia,
  sendLocationMessage,
} from "../Helpers/WhatsappHelper.js";
import axios from "axios";

const customerName = "Pranav";


let responseMessage;

const responses = {
  greetings: "Hello! How can I assist you today? 😊",
  thanks:
    "You're welcome! Let me know if there's anything else I can help you with. 🌟",
  appreciation: "I'm glad to be of help! Have a great day ahead! 🌈",
  farewell: "Goodbye! Feel free to reach out anytime. 👋",
  inquiry:
    "Could you please provide more details so I can assist you better? 🤔",
  confusion: "I'm sorry, I didn't quite catch that. Can you rephrase? 🤷‍♂️",
  request_services:
    "We offer a wide range of services! Could you specify what you're looking for? 🛠️",
  asking_cost:
    "Our pricing depends on the specific service or package. Can you share more details? 💰",
  compliments: "Thank you for your kind words! It means a lot to us. 😊",
  greetings_morning: "Good morning! Wishing you a productive day ahead. ☀️",
  greetings_evening: "Good evening! How can I assist you today? 🌙",
  greetings_afternoon: "Good afternoon! Let me know how I can help. 🌤️",
  follow_up: "I'll get back to you on this shortly. Please hold on. ⏳",
  unknown: "I didn't understand that. Could you clarify your message? 🧐",
};

const getWelcomeMessage = async (req, res) => {
  try {
    console.log("tour", req.body);

    const { recipientName } = req.body;
    const response = getWelcomeMessageTemplate(
      process.env.RECIPIENT_WAID,
      recipientName
    );

    const completedResponse = await sendMessage(response);

    console.log("completedResponse", completedResponse);

    return res.status(200).send("Message sent successfully.");
  } catch (error) {
    // Log and handle error
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
    return res.status(500).send("Failed to send message.");
  }
};

const enquirePackageDetails = async (req, res) => {
  try {
    console.log("tour", req.body);

    const { selectedPackage } = req.body;

    const Package = selectedPackage[0];

    const response = getImageTemplatedMessage(
      process.env.RECIPIENT_WAID,
      Package
    );

    console.log("response message", response);

    const completedResponse = sendMessage(response);

    console.log("completedResponse", completedResponse);

    return res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
    return res.status(500).send("Failed to send message.");
  }
};

const getPackageVideos = async (req, res) => {
  try {
    const selectedVideoPackagedetails = req.body?.selectedPackageDetails[0];

    console.log("selee", selectedVideoPackagedetails);

    const response = getVideoMessageInput(
      process.env.RECIPIENT_WAID,
      customerName,
      selectedVideoPackagedetails
    );

    console.log("response message", response);

    const completedResponse = await sendMessage(response);

    console.log("completedResponse", completedResponse);

    return res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
    return res.status(500).send("Failed to send message.");
  }
};

const dateTesting = async (req, res) => {
  try {
    const travelDate = req.body.date;

    const response = travelDateTesting(process.env.RECIPIENT_WAID, travelDate);

    console.log("response message", response);

    const completedResponse = sendMessage(response);

    console.log("completedResponse", completedResponse);

    return res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.log("err", error.response.data.error.error_data);
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
    return res.status(500).send("Failed to send message.");
  }
};

const enquirePackageDetailsPdf = async (req, res) => {
  try {
    const selectedVideoPackagedetails = req.body?.selectedPackageDetails[0];

    console.log("selee", selectedVideoPackagedetails);

    const id = await uploadMedia();

    const response = getPackageDetailsInPdf(
      id,
      process.env.RECIPIENT_WAID,
      customerName,
      selectedVideoPackagedetails
    );

    const completedResponse = await sendMessage(response);

    console.log("completedResponse", completedResponse);

    return res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
    return res.status(500).send("Failed to send message.");
  }
};

const shareLocation = async (req, res) => {
  try {
    const selectedVideoPackagedetails = req.body?.selectedPackageDetails[0];

    const pickupDetails = {
      tripName: selectedVideoPackagedetails.name,
      locationName: selectedVideoPackagedetails.place,
      time: "08:00 AM",
      date: selectedVideoPackagedetails.travelDate,
      logo: "White Bus with TRAVOXIS Logo",
      bookingID: "TRX12345",
      latitude: 32.239632,
      longitude: 77.188713,
      locationAddress: "123 Main St, Manali",
    };

    const response = await sendLocationMessage(
      process.env.RECIPIENT_WAID,
      customerName,
      pickupDetails
    );

    console.log("response message".rainbow, response);

    const completedResponse = await sendMessage(response);

    console.log("completedResponse".rainbow, completedResponse);

    return res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
    return res.status(500).send("Failed to send message.");
  }
};



async function replyMessageStorage(userMessage, username, from, messageType) {
  try {
    userMessage = userMessage?.toLowerCase() || "";

    const responseMessageMap = {
      greeting: ["hi", "hello", "hey", "heya", "hi there"],
      thanks: ["thank you", "thanks", "thx", "thankyou", "much appreciated"],
      appreciation: ["great", "amazing", "awesome", "fantastic", "good work"],
      farewell: ["bye", "goodbye", "see you", "take care"],
      inquiry: ["what", "how", "why", "where", "when", "can i"],
      confusion: ["confused", "don't understand", "not clear", "help"],
      unknown: []
    };

    let responseMessage;

    // Check for greetings
    if (responseMessageMap.greeting.some(g => userMessage.includes(g))) {
      responseMessage = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: from,
        type: "interactive",
        interactive: {
          type: "list",
          header: {
            type: "text",
            text: "Welcome to Travo 😊",
          },
          body: {
            text: "How can we assist you today? Please choose from the options below:",
          },
          action: {
            button: "View Options",
            sections: [
              {
                title: "Options",
                rows: [
                  { id: "tour_packages", title: "1️⃣ Tour Packages", description: "Explore travel packages tailored for you." },
                  { id: "faqs", title: "2️⃣ FAQ", description: "Find answers to common questions." },
                  { id: "customer_support", title: "3️⃣ Customer Support", description: "Connect with our support team." },
                  { id: "payment_help", title: "4️⃣ Payment Help", description: "Need help with payment or booking?" },
                  { id: "booking_help", title: "5️⃣ Booking Help", description: "Need help with booking?" },
                ],
              },
            ],
          },
        },
      };
    } else {
      // Determine response based on keywords
      for (const [key, keywords] of Object.entries(responseMessageMap)) {
        if (keywords.some(keyword => userMessage.includes(keyword))) {
          responseMessage = responses[key]; // Assuming responses is a predefined object containing appropriate messages
          break;
        }
      }

      // Default to unknown response if no match found
      if (!responseMessage) {
        responseMessage = responses.unknown;
      }
    }

    console.log("responseMessage", responseMessage);

    // Generic function to send a message
    const sendMessage = async (data) => {
      const config = {
        method: "post",
        url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        data,
      };

      return await axios(config);
    };

    // Send list message or regular text response based on message type
    if (messageType === "text") {
      if (responseMessage.messaging_product) {
        const response = await sendMessage(responseMessage);
        console.log("List message sent successfully:", response.data);
        return response.data;
      } else {
        const textMessage = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: from,
          type: "text",
          text: { body: responseMessage },
        };
        const response = await sendMessage(textMessage);
        console.log("Message sent successfully:", response.data);
        return response.data;
      }
    }
    
  } catch (error) {
    console.error("Error in replyMessageStorage:", error.response?.data || error.message);
    throw new Error("Failed to send reply");
  }
}




export {
  getWelcomeMessage,
  enquirePackageDetails,
  getPackageVideos,
  dateTesting,
  enquirePackageDetailsPdf,
  shareLocation,
  replyMessageStorage,
};
