import {
    Calendar,
    Car,
    ChevronLeft,
    ChevronRight,
    Heart,
    MapPin,
    Share,
    Star,
    Tv,
    Users,
    Wifi
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { usePropertyById } from "../hooks/useListings";

const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    tv: Tv,
    kitchen: MapPin,
};

const PropertyDetail = () => {
    const { id } = useParams();
    const { data: propertyDetailData, isLoading, error } = usePropertyById(id);
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const checkInInputRef = useRef(null);
    const checkOutInputRef = useRef(null);
    // Handle loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rausch mb-4"></div>
                    <p className="text-gray-600">Loading property details...</p>
                </div>
            </div>
        );
    }

    // Calculate dates and pricing
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    // Handle error state
    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading property details</p>
                    <Button onClick={() => navigate('/')} variant="outline">
                        Go back home
                    </Button>
                </div>
            </div>
        );
    }

    // Handle case where data is not available
    if (!propertyDetailData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Property not found</p>
                    <Button onClick={() => navigate('/')} variant="outline">
                        Go back home
                    </Button>
                </div>
            </div>
        );
    }
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % propertyDetailData.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prev) => (prev - 1 + propertyDetailData.images.length) % propertyDetailData.images.length
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
                                {propertyDetailData.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span className="font-medium">{propertyDetailData.rating}</span>
                                    <span className="text-gray-600 ml-1">
                                        ({propertyDetailData.reviews.length} reviews)
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {propertyDetailData.location}
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
                            src={propertyDetailData.images[currentImageIndex] || "/placeholder.svg"}
                            alt={propertyDetailData.title}
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
                            {propertyDetailData.images.map((_, index) => (
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
                                <h4 className="text-lg sm:text-xl font-semibold mb-2">
                                    Hosted by {propertyDetailData.host?.name}
                                </h4>
                                <div className="flex items-center gap-4 text-gray-600">
                                    <span>{propertyDetailData.guests} guests</span>
                                    <span>{propertyDetailData.bedrooms} bedrooms</span>
                                    <span>{propertyDetailData.beds} beds</span>
                                    <span>{propertyDetailData.bathrooms} bathrooms</span>
                                </div>
                            </div>
                            {/* <div className="flex items-center">
                                <img
                                    src={propertyDetailData.host?.avatar || "/placeholder.svg"}
                                    alt={propertyDetailData.host?.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                {propertyDetailData.host?.verified && (
                                    <Badge className="ml-2 bg-green-100 text-green-800">
                                        Verified
                                    </Badge>
                                )}
                            </div> */}
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                What this place offers
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {propertyDetailData.amenities.map((amenity, index) => {
                                    const Icon = amenityIcons[amenity];
                                    return (
                                        <div key={index} className="flex items-center">
                                            {Icon && <Icon className="w-5 h-5 !mr-3 text-Rausch" />}
                                            <span className="capitalize">{amenity}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">About this place</h3>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {propertyDetailData.description}
                            </div>
                        </div>

                        {/* House Rules */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">House rules</h3>
                            <ul className="space-y-2">
                                {/* {propertyDetailData.houseRules.map((rule, index) => (
                                    <li key={index} className="text-gray-700">
                                        {rule}
                                    </li>
                                ))} */}
                            </ul>
                        </div>

                        {/* Reviews */}
                        <div className="">
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-xl font-semibold">Reviews</h3>
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span className="font-medium">{propertyDetailData.rating}</span>
                                    <span className="text-gray-600 ml-1">
                                        ({propertyDetailData.reviews.length} reviews)
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {/* {propertyDetailData.reviews.map((review) => (
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
                                ))} */}
                            </div>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-32">
                            <div className="mb-6">
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold">₹{propertyDetailData.price}</span>
                                    <span className="text-gray-600 ml-1">/ day</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span className="font-medium">{propertyDetailData.rating}</span>
                                    <span className="text-gray-600 ml-1">
                                        ({propertyDetailData.reviews.length} reviews)
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
                                                onClick={(e) => {
                                                    if (typeof e.target.showPicker === 'function') {
                                                        e.target.showPicker();
                                                    }
                                                }}
                                                ref={checkInInputRef}
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
                                                onClick={(e) => {
                                                    if (typeof e.target.showPicker === 'function') {
                                                        e.target.showPicker();
                                                    }
                                                }}
                                                ref={checkOutInputRef}
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
                                        >
                                            {[...Array(propertyDetailData.guests)].map((_, i) => (
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
                                            <span>₹{propertyDetailData.price} x {nights} nights</span>
                                            <span>₹{propertyDetailData.price * 3}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Cleaning fee</span>
                                            <span>₹75</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Service fee</span>
                                            <span>₹89</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                                            <span>Total</span>
                                            <span>₹{propertyDetailData.price * 3 + 75 + 89}</span>
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
