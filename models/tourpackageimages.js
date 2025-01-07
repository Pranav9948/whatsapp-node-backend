
import mongoose from "mongoose";

const tourPackageImageSchema = new mongoose.Schema({
  packageName: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true }
});


const TourPackageImage = mongoose.model('TourPackageImage', tourPackageImageSchema);

export default  TourPackageImage;

