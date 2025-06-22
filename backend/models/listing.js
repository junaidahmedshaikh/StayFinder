import mongoose from "mongoose";


const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  location: String,
  amenities: [String],
  images: [String],
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  beds: { type: Number, required: true },
  reviews: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "RentalUser" }
}, { timestamps: true });

const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;
