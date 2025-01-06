   
import express from 'express';
import  {getWelcomeMessage,getReplyToCustomer,enquirePackageDetails,getPackageVideos,dateTesting,enquirePackageDetailsPdf,shareLocation,bookNow} from '../controllers/whatsappControllers.js'


const router = express.Router();




router.post('/welcome-message',getWelcomeMessage)  
router.post('/enquire-package-details',enquirePackageDetails) /// images
router.post('/get-package-videos',getPackageVideos)
router.post('/send-location',shareLocation)
router.post('/book-now',bookNow)  

///date testing

router.post('/date-testing',dateTesting)
router.post('/get-package-pdf',enquirePackageDetailsPdf)

router.post('/get-image-template-reply-message',getReplyToCustomer)


export default router