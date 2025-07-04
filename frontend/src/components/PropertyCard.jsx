"use client";

import { Coffee, Heart, MapPin, Star, Waves, Wifi } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
const amenityIcons = {
  Wifi: Wifi,
  Pool: Waves,
  "Beach Access": Waves,
  Fireplace: Coffee,
  "Hot Tub": Waves,
  "Ski Access": Coffee,
  Gym: Coffee,
  Rooftop: Coffee,
  "City View": Coffee,
  Beach: Waves,
  "Yoga Studio": Coffee,
  Cenote: Waves,
  Spa: Waves,
  "Golf Course": Coffee,
  Garden: Coffee,
  Library: Coffee,
};

const PropertyCard = ({ property = {} }) => {
  // Add default values to prevent undefined errors
  const {
    title = "",
    images = [],
    host = { name: "Host" },
    rating = 0,
    location = "",
    amenities = [],
    price = 0,
    reviews = 0,
    isWishlisted = false
  } = property || {};

  const [isWishlistedState, setIsWishlistedState] = useState(isWishlisted);
//   const [isHovered, setIsHovered] = useState(false);

  const toggleWishlist = () => {
    setIsWishlistedState(!isWishlistedState);
  };
  console.log(property)

//   const handleMouseEnter = () => setIsHovered(true);
// const handleMouseLeave = () => setIsHovered(false);

  if (!property) {
    return null;
  }

  return (
    <Card
      className="group floating-card glass bg-white-95 backdrop-blur-xl border-0 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
    //   onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden">
        <img
          src={images[0] || "/placeholder.svg"}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 rounded-full backdrop-blur-md transition-all duration-300 ${
            isWishlistedState
              ? "bg-white-95 text-rausch hover:bg-white shadow-lg"
              : "bg-white-80 text-gray-600 hover:bg-white-95 hover:text-rausch"
          }`}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isWishlistedState ? "fill-current scale-110" : ""
            }`}
          />
        </Button>

        {/* Host Badge */}
        <Badge className="absolute bottom-4 left-4 bg-white-95 text-gray-900 hover:bg-white backdrop-blur-md border-0 rounded-full px-3 py-1">
          Hosted by {host.name}
        </Badge>

        {/* Floating Rating */}
        <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white-95 backdrop-blur-md rounded-full px-3 py-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Title and Location */}
        <div className="space-y-2">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-rausch transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-600 flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-babu" />
            {location}
          </p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity) => {
            const IconComponent = amenityIcons[amenity] || Coffee;
            return (
              <Badge
                key={amenity}
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-babu-light hover:text-babu-600 transition-colors duration-300 rounded-full px-3 py-1 text-xs flex items-center gap-1"
              >
                <IconComponent className="w-3 h-3" />
                {amenity}
              </Badge>
            );
          })}
        </div>

        {/* Price and Reviews */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-gray-900">
                ₹{price}
              </span>
              <span className="text-gray-600 text-sm">/ night</span>
            </div>
            <p className="text-sm text-gray-500">{reviews} reviews</p>
          </div>

          {/* Glow Effect on Hover */}
          <div>
            <Button
              size="sm"
              className="bg-gradient-rausch-beach hover:bg-gradient-rausch-beach-hover hover:scale-105 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle Border Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rausch-0 via-babu-0 to-beach-0 group-hover:from-rausch-20 group-hover:via-babu-20 group-hover:to-beach-20 transition-all duration-500 pointer-events-none" />
    </Card>
  );
};

export default PropertyCard;
