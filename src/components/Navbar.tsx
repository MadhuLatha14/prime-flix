
import React, { useState } from 'react';
import { Search, Film, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-black/80' : 'bg-white/90'} backdrop-blur-md ${theme.border} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-blue-500" />
            <span className={`text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent`}>
              PrimeFlix
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className={`${theme.text} hover:text-blue-500 transition-colors duration-200`}>
              Home
            </a>
            <a href="#" className={`${theme.textSecondary} hover:text-blue-500 transition-colors duration-200`}>
              Movies
            </a>
            <a href="#" className={`${theme.textSecondary} hover:text-blue-500 transition-colors duration-200`}>
              TV Shows
            </a>
            <a href="#" className={`${theme.textSecondary} hover:text-blue-500 transition-colors duration-200`}>
              Sports
            </a>
            <a href="#" className={`${theme.textSecondary} hover:text-blue-500 transition-colors duration-200`}>
              Kids
            </a>
          </div>

          {/* Search, Theme Toggle and Profile */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 ${theme.textSecondary} hover:${theme.text} transition-colors duration-200`}
            >
              <Search className="h-5 w-5" />
            </button>
            
            <button
              onClick={toggleTheme}
              className={`p-2 ${theme.textSecondary} hover:${theme.text} transition-colors duration-200`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
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
