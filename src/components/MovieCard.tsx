
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  rating: string;
  year: string;
  description: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const event = new CustomEvent('openPreviewModal', { detail: movie });
    window.dispatchEvent(event);
  };

  return (
    <div
      className="relative min-w-[280px] h-[400px] cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Movie Poster */}
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl hover:shadow-blue-500/25">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        
        {/* Content Overlay */}
        <div className={`absolute inset-0 p-4 flex flex-col justify-end transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100'
        }`}>
          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg leading-tight">
              {movie.title}
            </h3>
            
            <div className="flex items-center space-x-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                ★ {movie.rating}
              </span>
              <span className="text-gray-300 text-sm">{movie.year}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`${theme.surface} text-white px-2 py-1 rounded text-xs`}>
                {movie.genre}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Effects */}
        {isHovered && (
          <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-[1px] transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-500/30 rounded-full p-4 backdrop-blur-sm transform scale-110 transition-all duration-300 animate-pulse">
                <div className="text-white text-2xl">▶</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
