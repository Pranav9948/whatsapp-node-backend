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

async function replyMessageStorage(userMessage) {
  userMessage = userMessage.toLowerCase();

  console.log("userMessage".bgMagenta, userMessage);

  if (
    userMessage.includes("hi") ||
    userMessage.includes("hello") ||
    userMessage.includes("hey")
  ) {
    try {
      const response = getWelcomeMessageTemplate(
        process.env.RECIPIENT_WAID,
        username
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
