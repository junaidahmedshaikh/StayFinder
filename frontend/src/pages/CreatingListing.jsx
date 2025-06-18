import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  MapPin,
  DollarSign,
  Calendar,
  Wifi,
  Car,
  Coffee,
  Waves,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

const CreateListing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [listingData, setListingData] = useState({
    // Step 1: Property Details
    title: "",
    description: "",
    propertyType: "",
    location: "",
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,

    // Step 2: Photos
    photos: [],

    // Step 3: Amenities
    amenities: [],

    // Step 4: Pricing & Availability
    basePrice: "",
    cleaningFee: "",
    weeklyDiscount: "",
    monthlyDiscount: "",
    minimumStay: 1,
    maximumStay: "",
    availableFrom: "",
    availableTo: "",

    // Step 5: House Rules
    checkInTime: "15:00",
    checkOutTime: "11:00",
    smokingAllowed: false,
    petsAllowed: false,
    partiesAllowed: false,
    additionalRules: "",
  });

  const totalSteps = 5;

  const propertyTypes = [
    "House",
    "Apartment",
    "Villa",
    "Cabin",
    "Loft",
    "Bungalow",
    "Townhouse",
    "Condo",
  ];

  const amenitiesList = [
    { id: "wifi", name: "WiFi", icon: Wifi },
    { id: "parking", name: "Free parking", icon: Car },
    { id: "kitchen", name: "Kitchen", icon: Coffee },
    { id: "pool", name: "Pool", icon: Waves },
    { id: "ac", name: "Air conditioning", icon: Coffee },
    { id: "heating", name: "Heating", icon: Coffee },
    { id: "tv", name: "TV", icon: Coffee },
    { id: "washer", name: "Washer", icon: Coffee },
    { id: "dryer", name: "Dryer", icon: Coffee },
    { id: "gym", name: "Gym", icon: Coffee },
    { id: "hottub", name: "Hot tub", icon: Waves },
    { id: "fireplace", name: "Fireplace", icon: Coffee },
  ];

  const handleInputChange = (field, value) => {
    setListingData({ ...listingData, [field]: value });
  };

  const handleAmenityToggle = (amenityId) => {
    const updatedAmenities = listingData.amenities.includes(amenityId)
      ? listingData.amenities.filter((id) => id !== amenityId)
      : [...listingData.amenities, amenityId];

    setListingData({ ...listingData, amenities: updatedAmenities });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a server
    const newPhotos = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file,
    }));
    setListingData({
      ...listingData,
      photos: [...listingData.photos, ...newPhotos].slice(0, 10), // Max 10 photos
    });
  };

  const removePhoto = (photoId) => {
    setListingData({
      ...listingData,
      photos: listingData.photos.filter((photo) => photo.id !== photoId),
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, you would submit the listing data to your API
    alert("Listing created successfully! (This is a demo)");
    navigate("/dashboard");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Tell us about your place
              </h2>
              <p className="text-gray-600">
                Share some basic info, like where it is and how many guests can
                stay.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property title *
                </label>
                <Input
                  value={listingData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Give your place a catchy title"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={listingData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                  placeholder="Describe your place to guests..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property type *
                </label>
                <select
                  value={listingData.propertyType}
                  onChange={(e) =>
                    handleInputChange("propertyType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                >
                  <option value="">Select property type</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={listingData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="Enter full address"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={listingData.guests}
                    onChange={(e) =>
                      handleInputChange("guests", parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={listingData.bedrooms}
                    onChange={(e) =>
                      handleInputChange("bedrooms", parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beds
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={listingData.beds}
                    onChange={(e) =>
                      handleInputChange("beds", parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <Input
                    type="number"
                    min="1"
                    step="0.5"
                    value={listingData.bathrooms}
                    onChange={(e) =>
                      handleInputChange("bathrooms", parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Add some photos of your place
              </h2>
              <p className="text-gray-600">
                You'll need at least 5 photos to get started. You can add more
                or make changes later.
              </p>
            </div>

            <div className="space-y-4">
              {/* Photo Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">
                  Drag your photos here
                </p>
                <p className="text-gray-600 mb-4">Choose at least 5 photos</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Upload from your device
                  </Button>
                </label>
              </div>

              {/* Photo Grid */}
              {listingData.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {listingData.photos.map((photo, index) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.url || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          Cover photo
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Tell guests what your place has to offer
              </h2>
              <p className="text-gray-600">
                You can add more amenities after you publish your listing.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesList.map((amenity) => (
                <button
                  key={amenity.id}
                  onClick={() => handleAmenityToggle(amenity.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    listingData.amenities.includes(amenity.id)
                      ? "border-rausch bg-rausch-light"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <amenity.icon className="w-6 h-6 mb-2" />
                  <p className="font-medium">{amenity.name}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Set your price and availability
              </h2>
              <p className="text-gray-600">
                You can change these settings anytime.
              </p>
            </div>

            <div className="space-y-6">
              {/* Pricing */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Base price per night *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="number"
                        value={listingData.basePrice}
                        onChange={(e) =>
                          handleInputChange("basePrice", e.target.value)
                        }
                        placeholder="0"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cleaning fee
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="number"
                        value={listingData.cleaningFee}
                        onChange={(e) =>
                          handleInputChange("cleaningFee", e.target.value)
                        }
                        placeholder="0"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weekly discount (%)
                    </label>
                    <Input
                      type="number"
                      value={listingData.weeklyDiscount}
                      onChange={(e) =>
                        handleInputChange("weeklyDiscount", e.target.value)
                      }
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly discount (%)
                    </label>
                    <Input
                      type="number"
                      value={listingData.monthlyDiscount}
                      onChange={(e) =>
                        handleInputChange("monthlyDiscount", e.target.value)
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
              </Card>

              {/* Stay Requirements */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Stay requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum stay (nights)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={listingData.minimumStay}
                      onChange={(e) =>
                        handleInputChange(
                          "minimumStay",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum stay (nights)
                    </label>
                    <Input
                      type="number"
                      value={listingData.maximumStay}
                      onChange={(e) =>
                        handleInputChange("maximumStay", e.target.value)
                      }
                      placeholder="No limit"
                    />
                  </div>
                </div>
              </Card>

              {/* Availability */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available from
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={listingData.availableFrom}
                        onChange={(e) =>
                          handleInputChange("availableFrom", e.target.value)
                        }
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available to
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={listingData.availableTo}
                        onChange={(e) =>
                          handleInputChange("availableTo", e.target.value)
                        }
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Set house rules for your guests
              </h2>
              <p className="text-gray-600">
                Guests must agree to your house rules before they book.
              </p>
            </div>

            <div className="space-y-6">
              {/* Check-in/out times */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Check-in and checkout
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in time
                    </label>
                    <input
                      type="time"
                      value={listingData.checkInTime}
                      onChange={(e) =>
                        handleInputChange("checkInTime", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out time
                    </label>
                    <input
                      type="time"
                      value={listingData.checkOutTime}
                      onChange={(e) =>
                        handleInputChange("checkOutTime", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                    />
                  </div>
                </div>
              </Card>

              {/* Rules */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">House rules</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={listingData.smokingAllowed}
                      onChange={(e) =>
                        handleInputChange("smokingAllowed", e.target.checked)
                      }
                      className="mr-3 rounded border-gray-300 text-rausch focus:ring-rausch"
                    />
                    <span>Smoking allowed</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={listingData.petsAllowed}
                      onChange={(e) =>
                        handleInputChange("petsAllowed", e.target.checked)
                      }
                      className="mr-3 rounded border-gray-300 text-rausch focus:ring-rausch"
                    />
                    <span>Pets allowed</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={listingData.partiesAllowed}
                      onChange={(e) =>
                        handleInputChange("partiesAllowed", e.target.checked)
                      }
                      className="mr-3 rounded border-gray-300 text-rausch focus:ring-rausch"
                    />
                    <span>Parties and events allowed</span>
                  </label>
                </div>
              </Card>

              {/* Additional Rules */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Additional rules</h3>
                <textarea
                  value={listingData.additionalRules}
                  onChange={(e) =>
                    handleInputChange("additionalRules", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                  placeholder="Add any additional rules or important information for guests..."
                />
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Create a new listing
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentStep / totalSteps) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-rausch-beach h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 mb-8">{renderStepContent()}</Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep === totalSteps ? (
            <Button onClick={handleSubmit} className="flex items-center gap-2">
              Publish Listing
            </Button>
          ) : (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateListing;
