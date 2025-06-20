import Booking from "../models/booking.js";

export const createBooking = async (req, res) => {
  const { listing, checkIn, checkOut, totalPrice, userId} = req.body;

  const booking = await Booking.create({
    listing,
    user: userId,
    checkIn,
    checkOut,
    totalPrice,
  });

  res.status(201).json(booking, { message: "Booking created successfully" });
};

export default createBooking
