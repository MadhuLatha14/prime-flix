
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Play, Info, Plus, Heart, Volume2, VolumeX } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  poster: string;
  previewVideoUrl?: string;
  genre: string;
  rating: string;
  year: string;
  description: string;
  duration?: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Show video preview immediately on hover
    if (movie.previewVideoUrl) {
      setShowVideo(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
    setVideoLoaded(false);

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
        console.log('Auto-play failed for video preview');
      });
    }
  };

  const handleVideoError = () => {
    setShowVideo(false);
    setVideoLoaded(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleClick = () => {
    const event = new CustomEvent('openPreviewModal', { detail: movie });
    window.dispatchEvent(event);
  };

  return (
    <div
      className={`group relative min-w-[280px] cursor-pointer transition-all duration-500 ease-out ${
        isHovered ? 'scale-110 z-50' : 'scale-100'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Main Card Container */}
      <div className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 ${
        isHovered ? 'shadow-black/50' : 'shadow-black/20'
      }`}>
        
        {/* Image/Video Container */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {/* Static Poster Image */}
          <img
            src={movie.poster}
            alt={movie.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              showVideo && videoLoaded ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
            }`}
          />
          
          {/* Video Preview */}
          {showVideo && movie.previewVideoUrl && (
            <video
              ref={videoRef}
              src={movie.previewVideoUrl}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              muted={isMuted}
              loop
              playsInline
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
              preload="none"
            />
          )}
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
          <div className={`absolute inset-0 bg-gradient-to-r from-black/40 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>
        </div>

        {/* Content Overlay - Always Visible on Mobile, Hover on Desktop */}
        <div className={`absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 md:opacity-100 md:translate-y-0'
        }`}>
          
          {/* Movie Info */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-xl leading-tight line-clamp-2 drop-shadow-lg">
              {movie.title}
            </h3>
            
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-bold">
                <span>★</span>
                <span>{movie.rating}</span>
              </div>
              <span className="text-gray-300 text-sm font-medium">{movie.year}</span>
              {movie.duration && (
                <span className="text-gray-300 text-sm">{movie.duration}</span>
              )}
              <div className={`${
                movie.genre === 'Action' ? 'bg-red-600' :
                movie.genre === 'Drama' ? 'bg-purple-600' :
                movie.genre === 'Comedy' ? 'bg-green-600' :
                movie.genre === 'Thriller' ? 'bg-orange-600' :
                movie.genre === 'Crime' ? 'bg-gray-700' :
                'bg-blue-600'
              } text-white px-2 py-1 rounded-md text-xs font-medium`}>
                {movie.genre}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Only Show on Hover */}
        <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          {/* Video Controls */}
          {showVideo && videoLoaded && (
            <button
              onClick={toggleMute}
              className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
          
          {/* Like Button */}
          <button
            onClick={toggleLike}
            className={`p-2 rounded-full transition-all duration-200 backdrop-blur-sm ${
              isLiked 
                ? 'bg-red-600 text-white' 
                : 'bg-black/60 hover:bg-black/80 text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Play Button Overlay - Show on Hover */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isHovered && !showVideo ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4 transform transition-all duration-300 hover:scale-110 hover:bg-white/30">
            <Play className="w-8 h-8 text-white fill-current" />
          </div>
        </div>

        {/* Loading Indicator for Video */}
        {showVideo && !videoLoaded && movie.previewVideoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Preview Indicator */}
        {showVideo && videoLoaded && (
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Preview
            </div>
          </div>
        )}
      </div>

      {/* Extended Info Panel - Shows on Hover */}
      <div className={`absolute top-full left-0 right-0 bg-gray-900 rounded-b-xl p-4 shadow-2xl transform transition-all duration-500 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <p className="text-gray-300 text-sm line-clamp-3 mb-3">
          {movie.description}
        </p>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-white text-black py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-current" />
            Play
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200">
            <Plus className="w-4 h-4" />
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
