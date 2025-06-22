import {
    Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { features } from "../../constant";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useProperties } from "../hooks/useListings";
const HomePage = () => {

    const {data: properties, isLoading, error} = useProperties();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

   console.log(properties);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-rausch-beach opacity-10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-babu-purple opacity-10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-gradient-rausch-beach-light text-rausch border-rausch-light rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Travel Platform
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Find your perfect
              <span className="gradient-text"> stay</span>
            </h1>

            <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
              Discover extraordinary accommodations powered by AI. From
              minimalist lofts to luxury villas, find spaces that match your
              vibe perfectly.
            </p>
          </div>

          {/* Search Bar */}
          <div className="animate-scale-in">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why choose Stayfinder?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the future of travel with our cutting-edge platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (

              <Card
                key={feature.title}
                className={`glass bg-white-70 backdrop-blur-xl border-0 rounded-3xl p-8 text-center group hover:bg-white-90 transition-all duration-500 floating-card animation-delay-${index}`}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured stays
              </h2>
              <p className="text-gray-600">
                Handpicked by our AI for exceptional experiences
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-2xl border-rausch-light hover:bg-rausch-light transition-colors duration-300"
            >
              View all
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties && properties.length > 0 ? (
              properties.map((property, index) => (
                <div
                  key={property._id}
                  className={`animate-fade-in animation-delay-${index}`}
                >
                  <Link to={`/property/${property._id}`}>
                    <PropertyCard property={property} />
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-600">No properties available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="!py-20 !px-4 sm:px-6 lg:!px-8 relative overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 !mx-20 !my-5  rounded-2xl !bg-gradient-to-r from-Rausch to-Babu bg-opacity-20" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to start hosting?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of hosts earning extra income by sharing their
              space with travelers from around the world.
            </p>
            <Button
              size="lg"
              className="bg-white text-rausch hover:bg-gray-100 px-10 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-white-25 transition-all duration-300 group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Become a Host
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
