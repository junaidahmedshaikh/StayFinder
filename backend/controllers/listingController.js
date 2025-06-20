import Listing from "../models/listing.js";

export const getProperties = async (req, res) => {
  const listings = await Listing.find().populate("host", "name email");
  res.json(listings);
};

export const getPropertyById = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("host");
  res.json(listing);
};

export const createProperty = async (req, res) => {
  const newListing = await Listing.create({
    ...req.body,
  });
  res.status(201).json(newListing, { message: "Property created successfully" });
};


export const updateProperty = async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property updated successfully",
      data: updatedListing
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const deleteProperty = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Property deleted successfully" });
};

export const getUserProperties = async (req, res) => {
  const properties = await Listing.find({ host: req.params.id });
  res.status(200).json(properties);
};
