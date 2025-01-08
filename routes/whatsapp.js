   
import express from 'express';
import  {getWelcomeMessage,getReplyToCustomer,getTemplateMissingCustomer,getBookingConfirmationMessage,enquirePackageDetails,getPackageVideos,dateTesting,enquirePackageDetailsPdf,shareLocation,bookNow,getBookingCancellationMessage} from '../controllers/whatsappControllers.js'
import { getPackageImage, uploadPackageImage } from '../Helpers/WhatsappHelper.js';
import TourPackageImage from '../models/tourPackageImage.js';

const router = express.Router();




router.post('/welcome-message',getWelcomeMessage)  
router.post('/enquire-package-details',enquirePackageDetails) /// images
router.post('/get-package-videos',getPackageVideos)
router.post('/send-location',shareLocation)
router.post('/book-now',bookNow)  

///date testing

router.post('/date-testing',dateTesting)
router.post('/get-package-pdf',enquirePackageDetailsPdf)


router.post('/get-template-missing-templateDetails',getTemplateMissingCustomer)

router.post('/get-image-template-reply-message',getReplyToCustomer)


router.post('/booking-confirmationMessage',getBookingConfirmationMessage)

router.post('/booking-cancellationMessage',getBookingCancellationMessage)

  
router.post('/uploadPackageImage', async (req, res) => {
    const { packageName, imageUrl } = req.body;
  
    if (!packageName || !imageUrl) {
      return res.status(400).send("Package name and image URL are required.");
    }



    try {
      // Check if the package exists in the database
      const existingPackage = await TourPackageImage.findOne({ packageName });
  
      if (existingPackage) {
        return res.status(200).send({ message: "Package already exists", package: existingPackage });
      }
  
      // If the package doesn't exist, add it
      const newPackage = new Package({ packageName, imageUrl });
      await newPackage.save();
  
      return res.status(200).send({ message: "Package added successfully", package: newPackage });
    } catch (error) {
      console.error("Error in uploadPackageImage:", error);
      return res.status(500).send({ error: error.message });
    }
  
   
  });


  router.get('/getPackageImage', async (req, res) => {
    const { packageName } = req.query;
  
    if (!packageName) {
      return res.status(400).send("Package name is required.");
    }
  
    try {
      const imageUrl = await getPackageImage(packageName);
      res.status(200).send({ packageName, imageUrl });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  


export default router