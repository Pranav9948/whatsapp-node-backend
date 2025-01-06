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
  getBookNowMessageTemplate,getImageTemplateReplyMessage,replyMessageStorage,
  getTextMessageInput

  
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
    const { selectedPackage } = req.body;

    console.log("selected package", selectedPackage);

    const packagedetails = selectedPackage[0];

    const Package = {
      cost: 15000,
      description:
        "Experience the serene beauty of Langkawi's pristine beaches, lush forests, and iconic cable car ride.",
      images:
        "https://media-cdn.tripadvisor.com/media/photo-s/29/27/d6/07/berjaya-langkawi-resort.jpg",
    };

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

const bookNow = async (req, res) => {
  try {
    console.log("tour", req.body);

    const Packages = req.body.payload;

    const response = await getBookNowMessageTemplate(
      process.env.RECIPIENT_WAID,
      Packages
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

const getReplyToCustomer = async (req,res) => {



console.log('hello',colors.magenta("helloooo"))

  try {
    
   const responseTemplate  = await getImageTemplateReplyMessage()

   const completedResponse = await sendMessage(responseTemplate);

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



async function sendQuickReplyButtonMessages(to, message) {


  console.log('to',to)
  console.log('message',message)


  try {
    

   const response= await getTextMessageInput(to, message)

   console.log("response here", response);

   const completedResponse = await sendMessage(response);


  } catch (error) {
    console.log("err".america, error.config.data);

    if (error.response) {
      console.log("error".red, error.response.data.error.error_data);
      console.error("Error response from API:", {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request was sent but no response received
      console.error("No response received:", error.request);
    } else {
      // An error occurred while setting up the request
      console.error("Error setting up request:", error.message);
    }

    // Re-throw the error to let the caller handle it
    throw new Error(
      `Failed to send message: ${
        error.response?.data?.error?.message || error.message
      }`
    );
  }

  

}



export {
  getWelcomeMessage,
  enquirePackageDetails,
  getPackageVideos,
  dateTesting,
  enquirePackageDetailsPdf,
  shareLocation,
  getImageTemplateReplyMessage,  
  bookNow,
  getReplyToCustomer,sendQuickReplyButtonMessages
};
