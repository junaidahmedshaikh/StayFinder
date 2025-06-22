"use client";

import {
    Calendar,
    MapPin,
    Search,
    Users
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";

const SearchBar = () => {
  const navigate = useNavigate();
  const [userSearch, setUserSearch] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });
  const checkInInputRef = useRef(null);
  const checkOutInputRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userSearch);
    navigate(
      `/search?location=${userSearch.location}&checkIn=${userSearch.checkIn}&checkOut=${userSearch.checkOut}&guests=${userSearch.guests}`
    );
  };

 const handleIconClick = (ref) => {
    if (ref === "checkInInputRef") {
      if (typeof checkInInputRef.current?.showPicker === 'function') {
        checkInInputRef.current.showPicker();
      } else {
        checkInInputRef.current?.click();
      }
    } else if (ref === "checkOutInputRef") {
      if (typeof checkOutInputRef.current?.showPicker === 'function') {
        checkOutInputRef.current.showPicker();
      } else {
        checkOutInputRef.current?.click();
      }
    }
  };

  return (
    <div className="relative">
      <Card className="glass shadow-2xl border-0 bg-white-90 backdrop-blur-xl rounded-3xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            {/* Location Input */}
            <div className="relative group ">
              <MapPin className="absolute z-50 left-4 top-[65%] transform -translate-y-1/2 text-Rausch w-5 h-5 group-hover:text-gray-500 transition-colors" />
              <Input
                placeholder="Where to?"
                className="pl-12 pr-4 border-0 focus:ring-2 focus:ring-rausch-50 h-16 text-base bg-white-70 rounded-2xl backdrop-blur-sm hover:bg-white-90 transition-all duration-300"
                value={userSearch.location}
                onChange={(e) =>
                  setUserSearch({ ...userSearch, location: e.target.value })
                }
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rausch-0 to-rausch-0 group-hover:from-rausch-5 group-hover:to-babu-5 transition-all duration-300 pointer-events-none" />
            </div>

            {/* Check-in Input */}
            <div className="relative rounded-2xl border border-gray-300 bg-white text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rausch focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <Calendar
                onClick={() => handleIconClick("checkInInputRef")}
                className="absolute z-50 left-4 top-[65%] transform -translate-y-1/2 text-Rausch w-5 h-5 group-hover:text-gray-500 transition-colors cursor-pointer"
              />
              <input
                type="date"
                placeholder="Check in"
               onClick={(e) => {
                  if (typeof e.target.showPicker === 'function') {
                    e.target.showPicker();
                  }
                }}
                ref={checkInInputRef}
                className="pl-12 pr-4 placeholder:text-gray-500 outline-none  border-0 h-16
                text-base bg-white-70 backdrop-blur-sm transition-all duration-300 cursor-pointer"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-babu-0 to-babu-0 group-hover:from-babu-5 group-hover:to-beach-5 transition-all duration-300 pointer-events-none" />
            </div>

            {/* Check-out Input */}
            <div className="relative rounded-2xl border border-gray-300 bg-white text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rausch focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <Calendar
                onClick={() => handleIconClick("checkOutInputRef")}
                className="absolute z-50 left-4 top-[65%] transform -translate-y-1/2 text-Rausch w-5 h-5 group-hover:text-gray-500 transition-colors cursor-pointer"
              />
              <input
                type="date"
                placeholder="Check out"
                ref={checkOutInputRef}
                 onClick={(e) => {
                  if (typeof e.target.showPicker === 'function') {
                    e.target.showPicker();
                  }
                }}
                className="pl-12 pr-4 placeholder:text-gray-500 outline-none  border-0 h-16
                text-base bg-white-70 backdrop-blur-sm transition-all duration-300 cursor-pointer"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-babu-0 to-babu-0 group-hover:from-babu-5 group-hover:to-beach-5 transition-all duration-300 pointer-events-none" />
            </div>

            {/* Guests Input */}
            <div className="relative group ">
              <Users className="absolute z-50 left-4 top-[65%] transform -translate-y-1/2 text-Rausch w-5 h-5 group-hover:text-gray-500 transition-colors" />
              <Input
                placeholder="Guests"
                value={userSearch.guests}
                onChange={(e) => {
                  setUserSearch({ ...userSearch, guests: e.target.value });
                }}
                className="pl-12 pr-4 border-0 focus:ring-2 focus:ring-purple-50 h-16 text-base bg-white-70 rounded-2xl backdrop-blur-sm hover:bg-white-90 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-0 to-purple-0 group-hover:from-purple-5 group-hover:to-blue-5 transition-all duration-300 pointer-events-none" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-center">
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={handleVoiceSearch}
                className={`h-16 w-16 rounded-2xl transition-all duration-300 ${
                  isListening
                    ? "bg-rausch text-white animate-glow"
                    : "bg-white-70 hover:bg-rausch-light text-gray-600"
                }`}
              >
                <Mic className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="h-16 w-16 rounded-2xl bg-white-70 hover:bg-babu-light text-gray-600 transition-all duration-300"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button> */}

              <Button
                size="lg"
                className="h-16 px-8 bg-gradient-rausch-beach hover:bg-gradient-rausch-beach-hover rounded-2xl shadow-lg shadow-rausch-25 hover:shadow-rausch-40 transition-all duration-300 group"
              >
                <span className="mr-2 group-hover:scale-110 transition-transform">
                  Search
                </span>
                <Search className="w-5 h-5  group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="absolute top-full left-0 right-0 mt-4 glass bg-white-95 backdrop-blur-xl rounded-3xl border-0 shadow-2xl animate-fade-in z-10">
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Price Range
                </label>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-gradient-rausch-beach rounded-full w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    House
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Apartment
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Amenities
                </label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    WiFi
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Pool
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Instant Book
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-babu rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
