
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import moviesData from '../data/movies.json';

const HeroCarousel = () => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Create featured movies array from different categories
  const featuredMovies = [
    moviesData.featured,
    ...moviesData.trending.slice(0, 2),
    ...moviesData.popular.slice(0, 2)
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isHovered, featuredMovies.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const currentMovie = featuredMovies[currentSlide];

  return (
    <div 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Transition */}
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in">
              {currentMovie.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-bold">
                ★ {currentMovie.rating}
              </span>
              <span className="text-gray-300">{currentMovie.year}</span>
              <span className="text-gray-300">{currentMovie.duration}</span>
              <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
                {currentMovie.genre}
              </span>
            </div>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {currentMovie.description}
            </p>

            <div className="flex space-x-4">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center space-x-2 transform hover:scale-105">
                <span>▶</span>
                <span>Play Now</span>
              </button>
              <button className="bg-gray-800/80 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 backdrop-blur-sm transform hover:scale-105">
                + My List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-500 scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
