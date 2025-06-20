import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "RentalUser" },
  checkIn: Date,
  checkOut: Date,
  totalPrice: Number
}, { timestamps: true });

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
