import React, { useState } from "react";
import { navItems } from "../constants";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileScreen, setMobileScreen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setMobileScreen(!mobileScreen);
  };

  const handleExploreClick = () => {
    navigate("/code-editor");
  };

  const handleSignClick = () => {
    navigate("/signup");
  }

  return (
    <nav className="sticky top-0 z-50 bg-purple-600 backdrop-blur-md border-b border-neutral-700">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-white tracking-wider">
          ThinkBoard
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-8 text-white font-medium">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="hover:text-yellow-300 transition duration-300"
            >
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex space-x-4">
          <a
            // href="#"
            onClick = {handleSignClick}
            className="py-2 px-4 border cursor-pointer border-neutral-300 rounded-lg text-white hover:border-yellow-300 transition duration-300"
          >
            Sign In
          </a>
          <button
            onClick={handleExploreClick}
            className="py-2 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-neutral-900 font-semibold shadow-md hover:opacity-90 transition duration-300"
          >
            Explore for Free
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleNav}
          className="lg:hidden text-white focus:outline-none"
          aria-label="Toggle navigation"
          aria-expanded={mobileScreen}
        >
          {mobileScreen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileScreen && (
        <div
          className={`lg:hidden bg-neutral-800 text-white fixed inset-0 z-40 flex flex-col items-center justify-center space-y-6 transform transition-transform duration-500 ${
            mobileScreen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <ul className="space-y-4 text-center font-medium">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="hover:text-yellow-300 transition duration-300"
              >
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col space-y-4">
            <a
              // href="#"
              onClick={handleSignClick}
              className="py-2 px-6 border cursor-pointer border-neutral-300 rounded-lg hover:border-yellow-300 transition duration-300"
            >
              Sign In
            </a>
            <button
              onClick={handleExploreClick}
              className="py-2 px-6 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-neutral-900 font-semibold shadow-md hover:opacity-90 transition duration-300"
            >
              Explore
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
