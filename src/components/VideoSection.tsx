
import React, { useState } from 'react';
import Carousel from './Carousel';
import moviesData from '../data/movies.json';

const VideoSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

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

  return (
    <div className="bg-black py-8 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeCategory === 'all' ? (
          <>
            <Carousel title="Trending Now" movies={moviesData.trending} />
            <Carousel title="Popular on PrimeFlix" movies={moviesData.popular} />
            <Carousel title="Action Movies" movies={moviesData.action} />
            <Carousel title="Drama Series" movies={moviesData.drama} />
            <Carousel title="Comedy Shows" movies={moviesData.comedy} />
          </>
        ) : (
          <Carousel
            title={`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Content`}
            movies={getMoviesByCategory()}
          />
        )}
      </div>
    </div>
  );
};

export default VideoSection;
