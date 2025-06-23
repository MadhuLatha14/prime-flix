import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Movie {
  id: string;
  title: string;
  poster: string;
  previewVideoUrl?: string;
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
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Set timeout for 2 seconds to show video preview
    if (movie.previewVideoUrl) {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowVideo(true);
      }, 2000);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
    setVideoLoaded(false);
    
    // Clear the timeout if user leaves before 2 seconds
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Pause and reset video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play failed, fallback to poster
        console.log('Auto-play failed for video preview');
      });
    }
  };

  const handleVideoError = () => {
    // If video fails to load, keep showing poster
    setShowVideo(false);
    setVideoLoaded(false);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    const event = new CustomEvent('openPreviewModal', { detail: movie });
    window.dispatchEvent(event);
  };

  return (
    <div
      className="relative min-w-[280px] h-[400px] cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Movie Poster / Video Container */}
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl hover:shadow-blue-500/25">
        {/* Static Poster Image */}
        <img
          src={movie.poster}
          alt={movie.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            showVideo && videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Video Preview */}
        {showVideo && movie.previewVideoUrl && (
          <video
            ref={videoRef}
            src={movie.previewVideoUrl}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            preload="none"
          />
        )}
        
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
              
              {/* Video Preview Indicator */}
              {showVideo && videoLoaded && (
                <span className="bg-blue-500/80 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                  Preview
                </span>
              )}
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

        {/* Loading indicator for video */}
        {showVideo && !videoLoaded && movie.previewVideoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
