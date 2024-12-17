import axios from "axios";
import FormData from "form-data";
import fs from "fs";

async function sendMessage(data) {
  try {
    const config = {
      method: "post",
      url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    console.log("Message sent successfully:", response.data);
    return response.data;
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

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      body: text,
    },
  });
}

function getImageTemplatedMessage(recipient, tourPackage) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "tour_package_enquiry",
      language: {
        code: "en",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: tourPackage.images,
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: tourPackage.name,
            },
            {
              type: "text",
              text: tourPackage.description,
            },
            {
              type: "text",
              text: tourPackage.place,
            },
            {
              type: "text",
              text: tourPackage.cost,
            },
          ],
        },
      ],
    },
  });
}

function getWelcomeMessageTemplate(recipient, recipientName) {
  console.log("recipientName", recipientName);
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "welcome_message_",
      language: {
        code: "en",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: "https://i.ytimg.com/vi/XqIKXb4FYuo/maxresdefault.jpg",
              },
            },
          ],
        },

        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: recipientName,
            },
          ],
        },
      ],
    },
  });
}

function getVideoMessageInput(recipient, customerName, packageDetails) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "whatsapp_video_message",
      language: {
        code: "en",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "video",
              video: {
                link: packageDetails.videoUrl,
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: customerName,
            },
            {
              type: "text",
              text: packageDetails.name,
            },
            {
              type: "date_time",
              date_time: {
                fallback_value: packageDetails.travelDate,
              },
            },
            {
              type: "currency",
              currency: {
                fallback_value: `RM${packageDetails.cost}`,
                code: "MYR",
                amount_1000: packageDetails.cost * 1000,
              },
            },
          ],
        },
        {
          type: "button",
          sub_type: "QUICK_REPLY",
          index: "0",
          parameters: [
            {
              type: "payload",
              payload: "https://example.com",
            },
          ],
        },
      ],
    },
  });
}

function travelDateTesting(recipient, customerName, dateResult) {
  console.log("dateResult".red, dateResult);

  const traveldate = dateResult;

  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "traveldatetesting",
      language: {
        code: "en",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: traveldate,
            },
          ],
        },
      ],
    },
  });
}

function getPackageDetailsInPdf(id, recipient, customerName, tourPackage) {

console.log('id,recie,name,tour'.bgMagenta,id,recipient,customerName,tourPackage)


  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "whatsapp_tour_package_details_pdf",
      language: {
        code: "en",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "document",
              document: {
                id: id,
                filename: "langkawi-tour.pdf",
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: customerName,
            },
            {
              type: "text",
              text: tourPackage.name,
            },
          ],
        },
      ],
    },
  });
}

async function uploadMedia() {
  try {
    const filePath = process.cwd() + "/langkawi-tour.pdf";

    // Verify the file exists
    if (!fs.existsSync(filePath)) {
      console.error("Error: File does not exist at path:", filePath);
      return;
    }
    console.log("File exists at path:", filePath);

    // Create FormData
    const data = new FormData();
    data.append("messaging_product", "whatsapp");

    data.append("file", fs.createReadStream(filePath), {
      filename: "langkawi-tour.pdf",
      contentType: "application/pdf",
    });
    data.append("type", "application/pdf");

    // Send API request
    const response = await axios({
      url: `https://graph.facebook.com/v21.0/523399164189188/media`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      data: data,
    });

    console.log("API Response:", response.data.id);

    return response.data.id;

  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );

    if (error.response) {
      console.error("Detailed Error Response:", error.response.data);
    }
  }
}

async function sendLocationMessage(recipient, customerName, pickupDetails) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "tour_packages_pickup_location",
      language: {
        code: "en",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "location",
              location: {
                name: pickupDetails.locationName,
                address: pickupDetails.locationAddress,
                latitude: pickupDetails.latitude,
                longitude: pickupDetails.longitude,
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: customerName,
            },
            {
              type: "text",
              text: pickupDetails.tripName,
            },
            {
              type: "text",
              text: pickupDetails.locationName,
            },
            {
              type: "text",
              text: pickupDetails.time,
            },
            {
              type: "text",
              text: pickupDetails.date,
            },
            {
              type: "text",
              text: pickupDetails.logo,
            },
            {
              type: "text",
              text: pickupDetails.bookingID,
            },
          ],
        },
      ],
    },
  });
}

export {
  sendMessage,
  getTextMessageInput,
  getWelcomeMessageTemplate,
  getImageTemplatedMessage,
  getVideoMessageInput,
  travelDateTesting,
  getPackageDetailsInPdf,
  uploadMedia,
  sendLocationMessage,
};
