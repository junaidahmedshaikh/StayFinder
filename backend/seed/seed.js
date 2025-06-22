import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Listing from "../models/Listing.js";
import RentalUser from "../models/user.js";

dotenv.config();
mongoose.connect(process.env.DATABASE_URL);

const sampleImages = [
  "https://a0.muscache.com/im/pictures/miso/Hosting-1275108762654743153/original/1dc531fb-eb80-47d8-9ef2-c1f6a91ff336.jpeg?im_w=1200",
  "https://a0.muscache.com/im/pictures/airflow/Hosting-11628597/original/d137e517-364b-4c39-80c8-1039a3981611.jpg?im_w=720",
  "https://a0.muscache.com/im/pictures/miso/Hosting-12369681/original/4b0d7ece-a69a-4e12-b09c-631130518fd8.jpeg?im_w=720",
  "https://a0.muscache.com/im/pictures/miso/Hosting-23644525/original/71087a6f-8414-4cb9-834c-585bfa39677e.jpeg?im_w=720",
  "https://a0.muscache.com/im/pictures/miso/Hosting-12369681/original/4b0d7ece-a69a-4e12-b09c-631130518fd8.jpeg?im_w=720",
  "https://a0.muscache.com/im/pictures/8fda2da6-883f-49a6-9a57-f4b67b7cc270.jpg?im_w=720",
  "https://a0.muscache.com/im/pictures/9e78ca92-07a7-4855-a17b-0fe6b60e9f4a.jpg?im_w=720",
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
          reviews: String(Math.ceil(Math.random() * 100)),
          rating: String(Math.ceil(Math.random() * 5)),
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
