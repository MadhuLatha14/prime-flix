
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  const { theme } = useTheme();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'trending', label: 'Trending' },
    { id: 'popular', label: 'Popular' },
    { id: 'action', label: 'Action' },
    { id: 'drama', label: 'Drama' },
    { id: 'comedy', label: 'Comedy' },
  ];

  return (
    <div className={`${theme.surface}/50 backdrop-blur-sm ${theme.border} border-b sticky top-16 z-40 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`whitespace-nowrap pb-2 border-b-2 transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'text-blue-500 border-blue-500'
                  : `${theme.textSecondary} border-transparent hover:${theme.text} hover:border-blue-300`
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
