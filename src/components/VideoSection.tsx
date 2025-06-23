
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Carousel from './Carousel';
import LoadingSkeleton from './LoadingSkeleton';
import moviesData from '../data/movies.json';

interface VideoSectionProps {
  activeCategory: string;
}

const VideoSection = ({ activeCategory }: VideoSectionProps) => {
  const { theme } = useTheme();

  const getMoviesByCategory = () => {
    switch (activeCategory) {
      case 'trending':
        return moviesData.trending;
      case 'popular':
        return moviesData.popular;
      case 'action':
        return moviesData.action;
      case 'drama':
        return moviesData.drama;
      case 'comedy':
        return moviesData.comedy;
      default:
        return [
          ...moviesData.trending,
          ...moviesData.popular,
          ...moviesData.action,
          ...moviesData.drama,
          ...moviesData.comedy
        ];
    }
  };

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'trending':
        return 'Trending Now';
      case 'popular':
        return 'Popular Content';
      case 'action':
        return 'Action Movies';
      case 'drama':
        return 'Drama Series';
      case 'comedy':
        return 'Comedy Shows';
      default:
        return null;
    }
  };

  return (
    <div className={`${theme.background} py-8 space-y-12 transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeCategory === 'all' ? (
          <div className="space-y-12 animate-fade-in">
            <Carousel title="Trending Now" movies={moviesData.trending} />
            <Carousel title="Popular on PrimeFlix" movies={moviesData.popular} />
            <Carousel title="Action Movies" movies={moviesData.action} />
            <Carousel title="Drama Series" movies={moviesData.drama} />
            <Carousel title="Comedy Shows" movies={moviesData.comedy} />
          </div>
        ) : (
          <div className="animate-fade-in">
            <Carousel
              title={getCategoryTitle() || `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Content`}
              movies={getMoviesByCategory()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
