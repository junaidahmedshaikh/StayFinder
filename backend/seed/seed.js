import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import RentalUser from "../models/user.js";
import Listing from "../models/Listing.js";

dotenv.config();
mongoose.connect(process.env.DATABASE_URL);

const sampleImages = [
  "https://source.unsplash.com/800x600/?house",
  "https://source.unsplash.com/800x600/?apartment",
  "https://source.unsplash.com/800x600/?villa",
  "https://source.unsplash.com/800x600/?living-room",
  "https://source.unsplash.com/800x600/?bedroom",
  "https://source.unsplash.com/800x600/?cabin",
  "https://source.unsplash.com/800x600/?interior",
  "https://source.unsplash.com/800x600/?pool",
];

const sampleLocations = [
  "Manali, Himachal Pradesh",
  "Goa, India",
  "Udaipur, Rajasthan",
  "Munnar, Kerala",
  "Rishikesh, Uttarakhand",
];

const sampleDescriptions = [
  "Beautiful escape into the heart of nature.",
  "Luxury apartment with sea view.",
  "Quiet retreat in the hills with a modern vibe.",
  "Perfect for families and remote workers.",
  "Stay close to adventure and serenity.",
];

const sampleTitles = [
  "Cozy Mountain Cabin",
  "Modern Studio Apartment",
  "Beachside Villa Retreat",
  "Royal Heritage Home",
  "Jungle Treehouse Getaway",
];

const generateRandomImages = () =>
  Array.from({ length: 4 }, () => {
    const index = Math.floor(Math.random() * sampleImages.length);
    return sampleImages[index];
  });

const createSeedData = async () => {
  try {
    await RentalUser.deleteMany();
    await Listing.deleteMany();

    const users = [];

    for (let i = 1; i <= 5; i++) {
      const hashedPassword = await bcrypt.hash("password123", 10);

      const user = await RentalUser.create({
        name: `Host User ${i}`,
        email: `host${i}@stayfinder.com`,
        password: hashedPassword,
        isHost: true,
      });

      users.push(user);
    }

    const allListings = [];

    for (const user of users) {
      for (let j = 0; j < 5; j++) {
        const listing = await Listing.create({
          title: sampleTitles[j % sampleTitles.length],
          description: sampleDescriptions[j % sampleDescriptions.length],
          price: Math.floor(Math.random() * 3000) + 1000,
          location: sampleLocations[j % sampleLocations.length],
          images: generateRandomImages(),
          amenities: ["wifi", "parking", "kitchen", "tv"],
          host: user._id,
          beds: String(Math.ceil(Math.random() * 3)),
          bedrooms: String(Math.ceil(Math.random() * 2)),
          bathrooms: String(Math.ceil(Math.random() * 2)),
          guests: String(Math.ceil(Math.random() * 4) + 1),
        });

        allListings.push(listing);
      }
    }

    console.log("Successfully seeded data");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

createSeedData();
