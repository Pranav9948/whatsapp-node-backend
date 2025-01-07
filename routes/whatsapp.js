   
import express from 'express';
import  {getWelcomeMessage,getReplyToCustomer,getBookingConfirmationMessage,enquirePackageDetails,getPackageVideos,dateTesting,enquirePackageDetailsPdf,shareLocation,bookNow,getBookingCancellationMessage} from '../controllers/whatsappControllers.js'


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


router.post('/booking-confirmationMessage',getBookingConfirmationMessage)

router.post('/booking-cancellationMessage',getBookingCancellationMessage)


export default router