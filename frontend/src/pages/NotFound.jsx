import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { logoIcon } from "../../constant";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-transparent rounded-2xl flex items-center justify-center  group-hover:shadow-rausch-25 transition-all duration-300">
            {/* <Sparkles className="text-white w-5 h-5" /> */}
            <img
              className="w-full h-full"
              src={logoIcon}
              style={{
                filter: "contrast(100%)",
                mixBlendMode: "multiply",
              }}
              alt=""
            />
          </div>
          <span className="text-2xl font-bold gradient-text font-sans">
            Stayfinder
          </span>
        </Link>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-rausch-beach rounded-full opacity-10 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Home className="w-16 h-16 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
          <p className="text-gray-600 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved, deleted, or you might have entered the wrong URL.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>

          <div className="flex gap-3">
            <Link to="/search" className="flex-1">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search Properties
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Need help?</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link
              to="/help"
              className="text-rausch hover:text-rausch-600 font-medium"
            >
              Help Center
            </Link>
            <Link
              to="/contact"
              className="text-rausch hover:text-rausch-600 font-medium"
            >
              Contact Support
            </Link>
            <Link
              to="/about"
              className="text-rausch hover:text-rausch-600 font-medium"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
