import {
  Waves,
  Coffee,
  Car,
  Star,
  Sparkles,
  Zap,
  Globe,
  Shield,
} from "lucide-react";

export const featuredProperties = [
  {
    id: 1,
    title: "Modern Beachfront Villa",
    location: "Malibu, California",
    price: 450,
    rating: 4.9,
    reviews: 127,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    host: "Sarah",
    amenities: ["Wifi", "Pool", "Beach Access"],
    isWishlisted: false,
  },
  {
    id: 2,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: 280,
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    host: "Michael",
    amenities: ["Fireplace", "Hot Tub", "Ski Access"],
    isWishlisted: true,
  },
  {
    id: 3,
    title: "Urban Loft Downtown",
    location: "New York, NY",
    price: 320,
    rating: 4.7,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    host: "Emma",
    amenities: ["Gym", "Rooftop", "City View"],
    isWishlisted: false,
  },
  {
    id: 4,
    title: "Tropical Paradise Bungalow",
    location: "Tulum, Mexico",
    price: 180,
    rating: 4.9,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    host: "Carlos",
    amenities: ["Beach", "Yoga Studio", "Cenote"],
    isWishlisted: false,
  },
  {
    id: 5,
    title: "Luxury Desert Retreat",
    location: "Scottsdale, Arizona",
    price: 380,
    rating: 4.8,
    reviews: 94,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    host: "Jessica",
    amenities: ["Pool", "Spa", "Golf Course"],
    isWishlisted: true,
  },
  {
    id: 6,
    title: "Historic Countryside Manor",
    location: "Cotswolds, England",
    price: 520,
    rating: 4.9,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    host: "James",
    amenities: ["Garden", "Library", "Fireplace"],
    isWishlisted: false,
  },
];

export const categories = [
  {
    name: "Beachfront",
    icon: Waves,
    count: "2,340 stays",
    gradient: "from-babu-500 to-blue-500",
  },
  {
    name: "Cabins",
    icon: Coffee,
    count: "1,890 stays",
    gradient: "from-beach-500 to-yellow-500",
  },
  {
    name: "City",
    icon: Car,
    count: "3,450 stays",
    gradient: "from-rausch-500 to-pink-500",
  },
  {
    name: "Unique",
    icon: Star,
    count: "890 stays",
    gradient: "from-purple-500 to-indigo-500",
  },
];

export const features = [
  {
    icon: Zap,
    title: "Instant Booking",
    description: "Book instantly with our AI-powered matching system",
    gradient: "rausch-beach",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to premium properties in 190+ countries",
    gradient: "babu-blue",
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Advanced verification and 24/7 support",
    gradient: "purple-indigo",
  },
];

export const logoIcon = `https://res.cloudinary.com/difvkvxuy/image/upload/v1750158252/Logo_Icon-removebg-preview_yvlytt.png`;
export const logo =
  "https://res.cloudinary.com/difvkvxuy/image/upload/v1750157281/samples/ChatGPT_Image_Jun_17__2025__02_10_43_PM-removebg-preview_umgvgl.png";

export // Mock data - in real app, this would come from API
const properties = [
  {
    id: 1,
    title: "Modern Beachfront Villa",
    location: "Malibu, California",
    price: 450,
    rating: 4.9,
    reviews: 127,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    host: "Sarah",
    amenities: ["Wifi", "Pool", "Beach Access"],
    isWishlisted: false,
    instantBook: true,
  },
  {
    id: 2,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: 280,
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    host: "Michael",
    amenities: ["Fireplace", "Hot Tub", "Ski Access"],
    isWishlisted: true,
    instantBook: false,
  },
  {
    id: 3,
    title: "Urban Loft Downtown",
    location: "New York, NY",
    price: 320,
    rating: 4.7,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    host: "Emma",
    amenities: ["Gym", "Rooftop", "City View"],
    isWishlisted: false,
    instantBook: true,
  },
  {
    id: 4,
    title: "Tropical Paradise Bungalow",
    location: "Tulum, Mexico",
    price: 180,
    rating: 4.9,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    host: "Carlos",
    amenities: ["Beach", "Yoga Studio", "Cenote"],
    isWishlisted: false,
    instantBook: true,
  },
  {
    id: 5,
    title: "Luxury Desert Retreat",
    location: "Scottsdale, Arizona",
    price: 380,
    rating: 4.8,
    reviews: 94,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    host: "Jessica",
    amenities: ["Pool", "Spa", "Golf Course"],
    isWishlisted: true,
    instantBook: false,
  },
  {
    id: 6,
    title: "Historic Countryside Manor",
    location: "Cotswolds, England",
    price: 520,
    rating: 4.9,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    host: "James",
    amenities: ["Garden", "Library", "Fireplace"],
    isWishlisted: false,
    instantBook: true,
  },
];
