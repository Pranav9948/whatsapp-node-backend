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

const customerName = "Pranav";

const userSession = {};

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

async function replyMessageStorage(userMessage, username,from) {


  try {
    userMessage = userMessage?.toLowerCase() || "";

    console.log("User Message:", userMessage);

    if (!userSession[from]) {
      
      userSession[from] = true; 

      const responseTemplate = getWelcomeMessageTemplate(
        process.env.RECIPIENT_WAID,
        username
      );

      const completedResponse = await sendMessage(responseTemplate);

      console.log("Message sent successfully:", completedResponse);
      return completedResponse;
    } else {
      if (
        ["hi", "hello", "hey", "heya", "hi there"].some((g) =>
          userMessage.includes(g)
        )
      ) {
        responseMessage = responses.greetings;
      } else if (
        ["thank you", "thanks", "thx", "thankyou", "much appreciated"].some(
          (t) => userMessage.includes(t)
        )
      ) {
        responseMessage = responses.thanks;
      } else if (
        ["great", "amazing", "awesome", "fantastic", "good work"].some((a) =>
          userMessage.includes(a)
        )
      ) {
        responseMessage = responses.appreciation;
      } else if (
        ["bye", "goodbye", "see you", "take care"].some((f) =>
          userMessage.includes(f)
        )
      ) {
        responseMessage = responses.farewell;
      } else if (
        ["what", "how", "why", "where", "when", "can i"].some((q) =>
          userMessage.startsWith(q)
        )
      ) {
        responseMessage = responses.inquiry;
      } else if (
        ["confused", "don't understand", "not clear", "help"].some((c) =>
          userMessage.includes(c)
        )
      ) {
        responseMessage = responses.confusion;
      } else {
        responseMessage = responses.unknown;
      }

      console.log('responseMessage', responseMessage);

      // Send the response message
      const config = {
        method: "post",
        url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        data: {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: from,
          type: "text",
          text: {
            body: responseMessage,
          },
        },
      };

      const response = await axios(config);
      console.log("Message sent successfully:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error(
      "Error in replyMessageStorage:",
      error.response?.data || error.message
    );
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
