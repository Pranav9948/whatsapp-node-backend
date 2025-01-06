import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import colors from "colors";

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

function getBookNowMessageTemplate(recipient, bookingDetails) {
  console.log("bookingDetails".america, bookingDetails.selectedPackages);

  const packageName = bookingDetails.selectedPackages[0]?.title;
  const packagePrice = bookingDetails.selectedPackages[0]?.price;
  const roomType = bookingDetails.selectedRoom.name;
  const roomPrice = bookingDetails.selectedRoom.price;
  const startDate = bookingDetails.startDate;
  const endDate = bookingDetails.endDate;
  const roomsBooked = bookingDetails.selectedRooms;
  const headerImageUrl =
    "https://media2.thrillophilia.com/images/photos/000/080/179/original/1631022851_Rawa_Island_KL.jpg?w=753&h=450&dpr=1.5";
  const customerName = "Pranav";

  console.log("packageName", packageName);
  console.log("packagePrice", packagePrice);
  console.log("roomType", roomType);
  console.log("roomPrice", roomPrice);
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  console.log("roomsBoked", roomsBooked);
  console.log("headerImageUrl", headerImageUrl);
  console.log("customerName", customerName);

  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "book_now_template",
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
                link: headerImageUrl,
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            { type: "text", text: `${customerName}` },
            { type: "text", text: `${packageName}` },
            { type: "text", text: `${packagePrice}` },
            { type: "text", text: `${roomType}` },
            { type: "text", text: `${roomPrice}` },
            { type: "text", text: `${startDate}` },
            { type: "text", text: `${endDate}` },
            { type: "text", text: `${roomsBooked}` },
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

  console.log("packageDetails",colors.magenta(packageDetails));
  
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
  console.log(
    "id,recie,name,tour".bgMagenta,
    id,
    recipient,
    customerName,
    tourPackage
  );

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
      unknown: [],
    };


    const responses = {
      greeting: "Hello! How can we assist you today?",
      thanks: "You're welcome! Let us know if you need further assistance.",
      appreciation: "Thank you! We appreciate your kind words.",
      farewell: "Goodbye! Have a great day!",
      inquiry: "Could you provide more details about your inquiry?",
      confusion: "We're here to help! Could you clarify your issue?",
      unknown: "Sorry, I didn't understand that. Can you rephrase?",
    };

    let responseMessage;

    // Check for greetings
    if (responseMessageMap.greeting.some((g) => userMessage.includes(g))) {
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
                  {
                    id: "tour_packages",
                    title: "1️⃣ Tour Packages",
                    description: "Explore travel packages tailored for you.",
                  },
                  {
                    id: "faqs",
                    title: "2️⃣ FAQ",
                    description: "Find answers to common questions.",
                  },
                  {
                    id: "customer_support",
                    title: "3️⃣ Customer Support",
                    description: "Connect with our support team.",
                  },
                  {
                    id: "payment_help",
                    title: "4️⃣ Payment Help",
                    description: "Need help with payment or booking?",
                  },
                  {
                    id: "booking_help",
                    title: "5️⃣ Booking Help",
                    description: "Need help with booking?",
                  },
                ],
              },
            ],
          },
        },
      };
    } else {
      // Determine response based on keywords
      for (const [key, keywords] of Object.entries(responseMessageMap)) {
        if (keywords.some((keyword) => userMessage.includes(keyword))) {
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
    console.error(
      "Error in replyMessageStorage:",
      error.response?.data || error.message
    );
    throw new Error("Failed to send reply");
  }
}


///helloo


async function getImageTemplateReplyMessage(){

console.log('hello',colors.magenta("helloooo"))

  try {
    const bookingDetails = {
      packageName: "Bali Beach Getaway",
      customerName: "John Doe",
      checkIn: "2024-12-25",
      checkOut: "2025-01-05",
      roomType: "Deluxe Ocean View",
      roomCount: 2,
      totalPrice: 15000,
      adultCount: 2,
      adultPrice: 7500,
      childCount: 1,
      childPrice: 3000,
      toddlerCount: 0,
      toddlerPrice: 0,
      infantCount: 0,
      infantPrice: 0,
      packageOption: "All Inclusive",
      headerImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWyjlP-bbnNr9mWSm4reG8khducnLTMrZrNw&s",
    };

    const {
      packageName,
      customerName,
      checkIn,
      checkOut,
      roomType,
      roomCount,
      totalPrice,
      adultCount,  
      adultPrice,
      childCount,
      childPrice,
      toddlerCount,
      toddlerPrice,
      infantCount,
      infantPrice,
      packageOption,
      headerImageUrl,
    } = bookingDetails;

    const recipient = process.env.NEXT_PUBLIC_WHATSAPP_RECIPIENT_WAID;

    return JSON.stringify({
      messaging_product: "whatsapp",
      to: 917736228299,
      type: "template",
      template: {
        name: "booknow_reply_customers",
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
                  link: headerImageUrl,
                },
              },
            ],
          },
          {
            type: "body",
            parameters: [
              { type: "text", text: `${packageName}` }, // {{1}} - Package Name
              { type: "text", text: `${checkIn}` }, // {{2}} - Check-in Date
              { type: "text", text: `${checkOut}` }, // {{3}} - Check-out Date
              { type: "text", text: `${roomCount}` }, // {{4} - Room Count
              { type: "text", text: `${roomType}` }, // {{5} - Room Type

              { type: "text", text: `${adultCount}` }, // {{6} - Adult Count

              { type: "text", text: `${childCount}` }, // {{7}- Child Count

              { type: "text", text: `${toddlerCount}` }, // {{8}}- Toddler Count

              { type: "text", text: `${infantCount}` }, // {{9}} Infant Count

              { type: "text", text: "MYR" }, // {{11} - myr

              { type: "text", text: `${totalPrice}` }, // {{12}}   Price
            ],
          },


          {
            type: "button",
            sub_type: "quick_reply",
            index: 0,
            parameters: [{ type: "payload", payload: "Confirm Booking" }],
          },
          {
            type: "button",
            sub_type: "quick_reply",
            index: 1,
            parameters: [{ type: "payload", payload: "Cancel Inquiry" }],
          }


        ],
      },
    });
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
    return res.status(500).send("Failed to send message.");
  }
};















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
  getBookNowMessageTemplate,
  getImageTemplateReplyMessage,
  replyMessageStorage,
};
