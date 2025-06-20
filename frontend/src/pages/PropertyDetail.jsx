import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Share,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Waves,
  Shield,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  console.log(id)
  // Mock property data
  const property = {
    id: 1,
    title: "Modern Beachfront Villa with Stunning Ocean Views",
    location: "Malibu, California, United States",
    price: 450,
    rating: 4.9,
    reviews: 127,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    ],
    host: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
      joinDate: "2019",
      verified: true,
    },
    details: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      bathrooms: 3,
    },
    amenities: [
      { icon: Wifi, name: "Free WiFi" },
      { icon: Car, name: "Free parking" },
      { icon: Coffee, name: "Kitchen" },
      { icon: Waves, name: "Pool" },
      { icon: Shield, name: "Security cameras" },
    ],
    description: `Escape to this stunning beachfront villa where luxury meets comfort. Wake up to breathtaking ocean views from every room and enjoy direct beach access just steps from your door.

This beautifully designed home features an open-concept living space with floor-to-ceiling windows, a gourmet kitchen with top-of-the-line appliances, and a spacious outdoor deck perfect for entertaining.

The master suite boasts panoramic ocean views and a private balcony, while three additional bedrooms provide comfortable accommodations for up to 8 guests.`,
    houseRules: [
      "Check-in: 3:00 PM - 10:00 PM",
      "Checkout: 11:00 AM",
      "No smoking",
      "No pets",
      "No parties or events",
      "Quiet hours: 10:00 PM - 8:00 AM",
    ],
    reviews: [
      {
        id: 1,
        user: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
        rating: 5,
        date: "March 2024",
        comment:
          "Absolutely incredible stay! The views were even better than the photos. Sarah was an amazing host and the house had everything we needed for a perfect vacation.",
      },
      {
        id: 2,
        user: "Emma Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
        rating: 5,
        date: "February 2024",
        comment:
          "This place is a dream! Perfect for our family vacation. The kids loved the pool and beach access. Highly recommend!",
      },
      {
        id: 3,
        user: "David Kim",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
        rating: 4,
        date: "January 2024",
        comment:
          "Beautiful property with stunning views. Great location and very clean. Would definitely stay again.",
      },
    ],
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  const handleReserve = () => {
    navigate(
      `/booking/${id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <div className="min-h-screen bg-white">


      <div className="max-w-7xl !pt-10 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col  lg:!flex-row lg:items-center lg:justify-between gap-4">
            <div >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-600 ml-1">
                    ({property.reviews.length} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center gap-2 ${isWishlisted ? "text-rausch" : ""
                  }`}
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
                />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={property.images[currentImageIndex] || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-96 lg:!h-[500px] object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                      ? "bg-white"
                      : "bg-white bg-opacity-50"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 !space-y-8">
            {/* Host Info */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Hosted by {property.host.name}
                </h2>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>{property.details.guests} guests</span>
                  <span>{property.details.bedrooms} bedrooms</span>
                  <span>{property.details.beds} beds</span>
                  <span>{property.details.bathrooms} bathrooms</span>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src={property.host.avatar || "/placeholder.svg"}
                  alt={property.host.name}
                  className="w-12 h-12 rounded-full"
                />
                {property.host.verified && (
                  <Badge className="ml-2 bg-green-100 text-green-800">
                    Verified
                  </Badge>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <amenity.icon className="w-5 h-5 !mr-3 text-Rausch" />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h3 className="text-xl font-semibold mb-4">House rules</h3>
              <ul className="space-y-2">
                {property.houseRules.map((rule, index) => (
                  <li key={index} className="text-gray-700">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold">Reviews</h3>
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-600 ml-1">
                    ({property.reviews.length} reviews)
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                {property.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 !py-6 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.user}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium">{review.user}</div>
                        <div className="text-sm text-gray-600">
                          {review.date}
                        </div>
                      </div>
                      <div className="ml-auto flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-32">
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">${property.price}</span>
                  <span className="text-gray-600 ml-1">/ night</span>
                </div>
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-600 ml-1">
                    ({property.reviews.length} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <div className="relative flex justify-center">
                      <Calendar className="absolute left-3 top-1/2 !mt-2 transform -translate-y-1/2 w-4 h-4 text-Rausch" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full !pl-10 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 !mt-2 transform -translate-y-1/2 w-4 h-4 text-Rausch" />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full !pl-10 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                      />

                    </div>
                  </div>
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3  top-1/2 !mt-2 transform -translate-y-1/2 w-4 h-4 !text-Rausch" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full !pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                      //  className="w-full !pl-10 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                    >
                      {[...Array(property.details.guests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} guest{i > 0 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleReserve}
                className="w-full mb-4"
                disabled={!checkIn || !checkOut}
              >
                Reserve
              </Button>

              <p className="text-center text-sm text-gray-600">
                You won't be charged yet
              </p>

              {checkIn && checkOut && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>${property.price} x 3 nights</span>
                      <span>${property.price * 3}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>$75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$89</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>${property.price * 3 + 75 + 89}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PropertyDetail;
