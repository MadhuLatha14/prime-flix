
import React, { useState } from 'react';
import { Search, Film } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              PrimeFlix
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-orange-500 transition-colors duration-200">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
              Movies
            </a>
            <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
              TV Shows
            </a>
            <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
              Sports
            </a>
            <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
              Kids
            </a>
          </div>

          {/* Search and Profile */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Search className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="pb-4">
            <SearchBar onClose={() => setShowSearch(false)} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
