
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Info } from 'lucide-react';
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

  // Auto-slide functionality every 2 seconds
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered, featuredMovies.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentMovie = featuredMovies[currentSlide];

  return (
    <div 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Smooth Transition */}
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}
        >
          {/* Multiple Gradient Overlays for Better Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/40"></div>
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Movie Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent leading-tight transform transition-all duration-1000 animate-fade-in">
              {currentMovie.title}
            </h1>
            
            {/* Movie Metadata */}
            <div className="flex items-center flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-1 bg-yellow-500 text-black px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                <span>★</span>
                <span>{currentMovie.rating}</span>
              </div>
              <span className="text-gray-300 font-medium">{currentMovie.year}</span>
              <span className="text-gray-300">{currentMovie.duration}</span>
              <div className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                {currentMovie.genre}
              </div>
            </div>

            {/* Movie Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl line-clamp-3">
              {currentMovie.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="group relative overflow-hidden bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 shadow-2xl">
                <Play className="h-6 w-6 fill-current" />
                <span>Play Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3 transform hover:scale-105 border border-gray-600/50">
                <Plus className="h-6 w-6" />
                <span>My List</span>
              </button>
              
              <button className="bg-gray-800/60 hover:bg-gray-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm flex items-center justify-center transform hover:scale-105 border border-gray-600/30">
                <Info className="h-6 w-6" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>HD</span>
              <span>5.1 Surround</span>
              <span>CC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-500 ${
              index === currentSlide 
                ? 'w-12 h-3 bg-red-600' 
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            } rounded-full`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Slide Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
        <div 
          className="h-full bg-red-600 transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / featuredMovies.length) * 100}%` 
          }}
        ></div>
      </div>
    </div>
  );
};

export default HeroCarousel;
