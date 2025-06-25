
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { TrendingUp, Star, Zap, Drama, Smile, Flame } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  const { theme } = useTheme();

  const categories = [
    { id: 'all', label: 'All', icon: Flame },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'popular', label: 'Popular', icon: Star },
    { id: 'action', label: 'Action', icon: Zap },
    { id: 'drama', label: 'Drama', icon: Drama },
    { id: 'comedy', label: 'Comedy', icon: Smile },
  ];

  return (
    <div className={`sticky top-16 z-40 transition-all duration-300 ${
      theme.isDarkMode 
        ? 'bg-black/80 backdrop-blur-xl border-gray-800/50' 
        : 'bg-white/80 backdrop-blur-xl border-gray-200/50'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`group relative flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105'
                    : `${theme.textSecondary} hover:${theme.text} hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105`
                }`}
              >
                <IconComponent className={`w-4 h-4 transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-red-500'
                }`} />
                <span className="text-sm font-semibold">{category.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-500 opacity-20 animate-pulse"></div>
                )}
                
                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-full bg-red-600/10 scale-0 group-hover:scale-100 transition-transform duration-300 ${
                  isActive ? 'hidden' : ''
                }`}></div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
