import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { logoIcon } from "../../constant";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass bg-white-90 backdrop-blur-xl border-b border-white-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
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

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/hosting"
              className="text-gray-700 hover:text-rausch font-medium transition-colors duration-300"
            >
              Become a Host
            </a>
            <a
              href="/trips"
              className="text-gray-700 hover:text-babu font-medium transition-colors duration-300"
            >
              Trips
            </a>
            <a
              href="/wishlists"
              className="text-gray-700 hover:text-beach font-medium transition-colors duration-300"
            >
              Wishlists
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="rounded-2xl hover:bg-rausch-light border-Arches  transition-colors duration-300"
            >
              Sign In
            </Button>
            <Button className="bg-gradient-rausch-beach hover:bg-gradient-rausch-beach-hover rounded-2xl shadow-lg hover:shadow-rausch-25 transition-all duration-300">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
