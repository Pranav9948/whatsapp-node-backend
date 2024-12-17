import express from "express";
import cors from "cors";
import whatsappRoutes from "./routes/whatsapp.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 8500;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

const myToken = process.env.MYTOKEN;

app.use("/api/whatsapp", whatsappRoutes);

app.get("/", (req, res) => {
  res.send("whatsapp backend integration testing....");
});

app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];



  if (mode && token) {

    console.log('mode'.america,mode,token,myToken)
    if (mode === "subscribe" && myToken==token) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});


app.post("/webhook", async(req, res) => {
  console.log("req.body", req.body);  

  let body_param=req.body

  console.log(JSON.stringify(body_param,null,2))

  if(body_param.object){

    if(body_param.entry && 
      body_param.entry[0] &&
       body_param.entry[0].changes && 
       body_param.entry[0].changes[0] && 
       body_param.entry[0].changes[0].value.messages && 
       body_param.entry[0].changes[0].value.messages[0]){

        let phone_number_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
        let from = body_param.entry[0].changes[0].value.messages[0].from;
        let id = body_param.entry[0].changes[0].value.messages[0].id;
        let timestamp = body_param.entry[0].changes[0].value.messages[0].timestamp;
        let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;


        try {
          const config = {
            method: "post",
            url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
            headers: {
              Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
            data:{

              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: from,
              type: "text",
              text: {
                body: "Thank you for contacting us. We will get back to you shortly.",
              },


            },
          };
      
          const response = await axios(config);
          console.log("Message sent successfully:", response.data);
          return res.status(200).send("Message sent successfully");
        } catch (error) {
      
          
          console.log("err".america, error);

    }

  }

  else {

    res.status(404).send("Invalid request");
  }

}


})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
