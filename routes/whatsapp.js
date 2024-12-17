
import express from 'express';
import  {getWelcomeMessage,enquirePackageDetails,getPackageVideos,dateTesting,enquirePackageDetailsPdf,shareLocation} from '../controllers/whatsappControllers.js'


const router = express.Router();




router.post('/welcome-message',getWelcomeMessage)  
router.post('/enquire-package-details',enquirePackageDetails) /// images
router.post('/get-package-videos',getPackageVideos)
router.post('/send-location',shareLocation)

///date testing

router.post('/date-testing',dateTesting)
router.post('/get-package-pdf',enquirePackageDetailsPdf)


export default router