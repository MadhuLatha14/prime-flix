
import React from 'react';
import moviesData from '../data/movies.json';

const Hero = () => {
  const featured = moviesData.featured;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${featured.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {featured.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-orange-500 text-black px-3 py-1 rounded text-sm font-bold">
                ★ {featured.rating}
              </span>
              <span className="text-gray-300">{featured.year}</span>
              <span className="text-gray-300">{featured.duration}</span>
              <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
                {featured.genre}
              </span>
            </div>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {featured.description}
            </p>

            <div className="flex space-x-4">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
                <span>▶</span>
                <span>Play Now</span>
              </button>
              <button className="bg-gray-800/80 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 backdrop-blur-sm">
                + My List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
