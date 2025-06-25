
import React, { useState } from 'react';
import { Search, Film, Sun, Moon, User, Bell } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-black/90 backdrop-blur-xl border-gray-800/50' 
        : 'bg-white/90 backdrop-blur-xl border-gray-200/50'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Film className="h-8 w-8 text-red-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
              StreamFlix
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Movies', 'TV Shows', 'Sports', 'Kids', 'Live'].map((item, index) => (
              <a 
                key={item}
                href="#" 
                className={`relative group font-medium transition-all duration-300 ${
                  index === 0 
                    ? `${theme.text} font-semibold` 
                    : `${theme.textSecondary} hover:${theme.text}`
                }`}
              >
                {item}
                {index === 0 && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 rounded-full"></div>
                )}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 rounded-full transition-all duration-300 group-hover:w-full"></div>
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2.5 rounded-full transition-all duration-200 ${
                showSearch 
                  ? 'bg-red-600 text-white' 
                  : `${theme.textSecondary} hover:${theme.text} hover:bg-gray-100 dark:hover:bg-gray-800`
              }`}
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Notifications */}
            <button className={`p-2.5 rounded-full transition-all duration-200 relative ${theme.textSecondary} hover:${theme.text} hover:bg-gray-100 dark:hover:bg-gray-800`}>
              <Bell className="h-5 w-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-200 ${theme.textSecondary} hover:${theme.text} hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {/* Profile */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                <div className="h-8 w-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center ring-2 ring-red-500/20">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>
              
              {/* Profile Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="p-2">
                  {['My Profile', 'Watchlist', 'Settings', 'Help', 'Sign Out'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${theme.textSecondary} hover:${theme.text} hover:bg-gray-100 dark:hover:bg-gray-800`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="pb-4 animate-fade-in">
            <SearchBar onClose={() => setShowSearch(false)} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
