import { logoIcon } from "../../constant";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="glass bg-gray-900-95 backdrop-blur-xl text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
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
            <p className="text-gray-400 leading-relaxed">
              Discover extraordinary accommodations and create unforgettable
              travel experiences with AI-powered matching.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Support</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="/help"
                  className="hover:text-white transition-colors duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/safety"
                  className="hover:text-white transition-colors duration-300"
                >
                  Safety
                </a>
              </li>
              <li>
                <a
                  href="/cancellation"
                  className="hover:text-white transition-colors duration-300"
                >
                  Cancellation
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Community</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="/blog"
                  className="hover:text-white transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/newsroom"
                  className="hover:text-white transition-colors duration-300"
                >
                  Newsroom
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="hover:text-white transition-colors duration-300"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Hosting</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="/host"
                  className="hover:text-white transition-colors duration-300"
                >
                  Become a Host
                </a>
              </li>
              <li>
                <a
                  href="/hosting/resources"
                  className="hover:text-white transition-colors duration-300"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="/hosting/community"
                  className="hover:text-white transition-colors duration-300"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Stayfinder. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
