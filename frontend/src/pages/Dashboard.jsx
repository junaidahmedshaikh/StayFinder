import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  User,
  CreditCard,
  Bell,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  // Mock data
  const bookings = [
    {
      id: 1,
      property: "Modern Beachfront Villa",
      location: "Malibu, California",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop",
      checkIn: "2024-07-15",
      checkOut: "2024-07-20",
      guests: 4,
      total: 2250,
      status: "upcoming",
      host: "Sarah Johnson",
    },
    {
      id: 2,
      property: "Cozy Mountain Cabin",
      location: "Aspen, Colorado",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
      checkIn: "2024-06-10",
      checkOut: "2024-06-15",
      guests: 2,
      total: 1400,
      status: "completed",
      host: "Michael Chen",
    },
    {
      id: 3,
      property: "Urban Loft Downtown",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
      checkIn: "2024-05-01",
      checkOut: "2024-05-05",
      guests: 3,
      total: 1280,
      status: "cancelled",
      host: "Emma Rodriguez",
    },
  ];

  const listings = [
    {
      id: 1,
      title: "Luxury Penthouse Suite",
      location: "Miami, Florida",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
      price: 350,
      rating: 4.8,
      reviews: 42,
      status: "active",
      bookings: 15,
      earnings: 5250,
    },
    {
      id: 2,
      title: "Rustic Farmhouse",
      location: "Napa Valley, California",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
      price: 280,
      rating: 4.9,
      reviews: 28,
      status: "active",
      bookings: 8,
      earnings: 2240,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "active":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tabs = [
    { id: "bookings", label: "My Bookings", icon: Calendar },
    { id: "listings", label: "My Listings", icon: MapPin },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Manage your bookings, listings, and profile
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-rausch text-rausch"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Bookings</h2>
              <Link to="/search">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Book a Stay
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <img
                    src={booking.image || "/placeholder.svg"}
                    alt={booking.property}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">
                        {booking.property}
                      </h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {booking.location}
                    </p>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span>
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span>
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span>{booking.guests}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-gray-900">
                        <span>Total:</span>
                        <span>${booking.total}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {booking.status === "upcoming" && (
                        <Button variant="outline" size="sm" className="flex-1">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "listings" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Listings</h2>
              <Link to="/host/create">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Listing
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">{listing.title}</h3>
                      <Badge className={getStatusColor(listing.status)}>
                        {listing.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.location}
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {listing.rating}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">
                          ({listing.reviews})
                        </span>
                      </div>
                      <span className="text-lg font-bold">
                        ${listing.price}/night
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Total bookings:</span>
                        <span>{listing.bookings}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-gray-900">
                        <span>Total earnings:</span>
                        <span>${listing.earnings}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-xl font-semibold">Profile Settings</h2>

            {/* Personal Information */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop"
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium">John Doe</h4>
                    <p className="text-gray-600">john.doe@example.com</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Member since:</span>
                    <p className="font-medium">January 2023</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Verified:</span>
                    <p className="font-medium text-green-600">Email, Phone</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Payment Methods</p>
                      <p className="text-sm text-gray-600">
                        Manage your payment options
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-gray-600">
                        Email and push notification preferences
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Settings
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Privacy & Security</p>
                      <p className="text-sm text-gray-600">
                        Control your privacy settings
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="p-6 border-red-200">
              <h3 className="text-lg font-medium text-red-600 mb-4">
                Danger Zone
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-gray-600">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
