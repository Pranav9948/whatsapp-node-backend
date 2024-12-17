import express from 'express'
import cors from 'cors';
import whatsappRoutes from "./routes/whatsapp.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';




const app = express();
const PORT = process.env.PORT || 8500;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

app.use("/api/whatsapp",whatsappRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
