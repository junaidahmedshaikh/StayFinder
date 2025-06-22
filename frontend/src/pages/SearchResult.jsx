import {
    Filter,
    Map,
    Star
} from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useProperties } from "../hooks/useListings";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid"); // grid, list, map
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    propertyType: [],
    amenities: [],
    rating: 0,
    instantBook: false,
  });

  const location = searchParams.get("location") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = searchParams.get("guests") || "";

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "newest", label: "Newest" },
  ];

  const { data: properties, isLoading, error } = useProperties();

  // Filter and sort properties
  const getFilteredProperties = () => {
    if (!properties) return [];

    return properties.filter(property => {
      // Price Range Filter
      const withinPriceRange = property.price >= filters.priceRange[0] &&
                              property.price <= filters.priceRange[1];
      if (!withinPriceRange) return false;

      // Property Type Filter
      if (filters.propertyType.length > 0 &&
          !filters.propertyType.includes(property.propertyType)) {
        return false;
      }

      // Amenities Filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity =>
          property.amenities?.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Rating Filter
      if (filters.rating > 0 && property.rating < filters.rating) {
        return false;
      }

      // Location Filter
      if (location && !property.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      // Guest Filter
      if (guests && property.guests < parseInt(guests)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort properties based on selected option
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default: // 'recommended'
          return b.rating - a.rating;
      }
    });
  };

  const filteredProperties = getFilteredProperties();

  // Clear all filters function
  const handleClearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      propertyType: [],
      amenities: [],
      rating: 0,
      instantBook: false,
    });
    setSortBy('recommended');
  };

  console.log("🚀 ~ SearchResults ~ properties:", properties)
  const propertyTypes = [
    "House",
    "Apartment",
    "Villa",
    "Cabin",
    "Loft",
    "Bungalow",
  ];
  const amenitiesList = [
    "Wifi",
    "Pool",
    "Kitchen",
    "Parking",
    "AC",
    "Gym",
    "Beach Access",
    "Hot Tub",
  ];

  console.log(showFilters);
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-row lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Summary */}
            <div className="flex-1 justify-center items-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {location ? `Stays in ${location}` : "Search Results"}
              </h1>
              <div className="">
                <div className="!hidden lg:!flex flex-wrap border-2 h-12 items-center gap-10 text-sm text-gray-600">
                  {location && (
                    <span className="flex flex-wrap gap-2 items-center pr-10 pl-10 text-sm text-gray-600">
                      <span className="font-bold">{"Location: "}</span>{" "}
                      <span className=" font-semibold">{location}</span>
                    </span>
                  )}
                  {checkIn && (
                    <span className="flex flex-wrap gap-2 items-center pl-10 text-sm text-gray-600">
                      <span className="font-bold">{"Check-in: "}</span>{" "}
                      <span className=" font-semibold">{checkIn}</span>
                    </span>
                  )}
                  {checkOut && (
                    <span className="flex flex-wrap gap-2 items-center pl-10 text-sm text-gray-600">
                      <span className="font-bold">{"Check-out: "}</span>{" "}
                      <span className=" font-semibold">{checkOut}</span>
                    </span>
                  )}
                  {guests && (
                    <span className="flex flex-wrap gap-2 items-center pl-10 text-sm text-gray-600">
                      <span className="font-bold">{"Guests: "}</span>{" "}
                      <span className=" font-semibold">{guests}</span>
                    </span>
                  )}
                  <span className="flex flex-wrap gap-2 items-center pl-10 text-sm text-gray-600">
                    <span className="font-bold">{"Properties found: "}</span>{" "}
                    <span className=" font-semibold">{properties?.length || 0}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* View Controls */}
            <div className="flex flex-row justify-center items-center h-full">
              <div className="flex items-center justify-end gap-4">
                {/* <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-md"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-md"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="rounded-md"
                >
                  <Map className="w-4 h-4" />
                </Button>
              </div> */}

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="!hidden md:!block px-3 py-2 border cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-rausch focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl  pt-5 mx-auto !p-8 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <Card className="p-6 sticky top-32" >
                <h3 className="text-lg font-semibold mb-4">Filters</h3>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            priceRange: [
                              parseInt(e.target.value) || 0,
                              filters.priceRange[1],
                            ],
                          })
                        }
                        className="flex-1"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            priceRange: [
                              filters.priceRange[0],
                              parseInt(e.target.value) || 1000,
                            ],
                          })
                        }
                        className="flex-1"
                      />
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gradient-rausch-beach rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Property Type</h4>
                  <div className="space-y-2">
                    {propertyTypes.map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.propertyType.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                propertyType: [...filters.propertyType, type],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                propertyType: filters.propertyType.filter(
                                  (t) => t !== type
                                ),
                              });
                            }
                          }}
                          className="mr-2 rounded border-gray-300 text-rausch focus:ring-rausch"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {amenitiesList.map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                amenities: [...filters.amenities, amenity],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                amenities: filters.amenities.filter(
                                  (a) => a !== amenity
                                ),
                              });
                            }
                          }}
                          className="mr-2 rounded border-gray-300 text-rausch focus:ring-rausch"
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => setFilters({ ...filters, rating })}
                          className="mr-2 text-rausch focus:ring-rausch"
                        />
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm">{rating}+</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Instant Book */}
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.instantBook}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          instantBook: e.target.checked,
                        })
                      }
                      className="mr-2 rounded border-gray-300 text-rausch focus:ring-rausch"
                    />
                    <span className="text-sm font-medium">Instant Book</span>
                  </label>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </Button>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {viewMode === "map" ? (
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-8">
                <div className="text-center">
                  <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Map view placeholder</p>
                </div>
              </div>
            ) : null}

            <div
              className={
                viewMode === "grid"
                  ? `grid grid-cols-1 md:grid-cols-2 ${
                      showFilters ? "lg:!grid-cols-2" : "lg:!grid-cols-3"
                    }  gap-6`
                  : "space-y-6"
              }
            >
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
              ) : error ? (
                <div className="col-span-full flex justify-center items-center min-h-[400px]">
                  <div className="text-red-600 text-center">
                    <h2 className="text-2xl font-bold mb-2">Error Loading Properties</h2>
                    <p>{error.message || "Failed to load properties"}</p>
                  </div>
                </div>
              ) : filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <Link to={`/property/${property._id}`} key={property._id}>
                    <PropertyCard
                      property={property}
                      viewMode={viewMode}
                      showDetails={viewMode === "list"}
                    />
                  </Link>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center min-h-[400px]">
                  <p className="text-gray-600 text-lg">No properties found matching your criteria</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SearchResults;
