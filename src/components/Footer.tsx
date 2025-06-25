
import React from 'react';
import { Film, Youtube } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`${theme.surface} ${theme.border} border-t transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Film className="h-8 w-8 text-red-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
                StreamFlix
              </span>
            </div>
            <p className={theme.textSecondary}>
              Your premium destination for movies, TV shows, and original content. Stream unlimited entertainment.
            </p>
            <div className="flex space-x-4">
              <Youtube className={`h-6 w-6 ${theme.textSecondary} hover:text-red-500 cursor-pointer transition-colors duration-200`} />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className={`${theme.text} font-semibold mb-4`}>Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>Home</a></li>
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>Movies</a></li>
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>TV Shows</a></li>
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>Sports</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={`${theme.text} font-semibold mb-4`}>Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>Help Center</a></li>
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>Contact Us</a></li>
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>Privacy Policy</a></li>
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>Terms of Service</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className={`${theme.text} font-semibold mb-4`}>Account</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>My Account</a></li>
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>Subscription</a></li>
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>Watchlist</a></li>
              <li><a href="#" className={`${theme.textSecondary} hover:text-red-500 transition-colors duration-200`}>Settings</a></li>
            </ul>
          </div>
        </div>

        <div className={`${theme.border} border-t mt-8 pt-8 text-center`}>
          <p className={theme.textSecondary}>
            © 2024 StreamFlix. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
