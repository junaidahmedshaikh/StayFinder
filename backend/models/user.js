import mongoose from "mongoose";

const RentalUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isHost: { type: Boolean, default: false },
}, { timestamps: true });

const RentalUser = mongoose.model("RentalUser", RentalUserSchema);

export default RentalUser;
