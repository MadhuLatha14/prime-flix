
import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Settings } from 'lucide-react';
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

const EnhancedPreviewModal = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10);
  const [quality, setQuality] = useState('1080p');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      setMovie(event.detail);
      setIsOpen(true);
      setCurrentTime(0);
      setIsPlaying(true);
    };

    window.addEventListener('openPreviewModal', handleOpenModal as EventListener);
    
    return () => {
      window.removeEventListener('openPreviewModal', handleOpenModal as EventListener);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying && isOpen) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isOpen, duration]);

  const closeModal = () => {
    setIsOpen(false);
    setIsPlaying(false);
    setCurrentTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeout(() => setMovie(null), 300);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className={`relative ${theme.surface} rounded-2xl overflow-hidden max-w-5xl w-full max-h-[95vh] animate-scale-in shadow-2xl`}>
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video Player Section */}
        <div className="relative h-64 md:h-96 bg-black">
          {/* Video Placeholder with Preview Simulation */}
          <div 
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${movie.poster})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="bg-blue-600/80 hover:bg-blue-600 rounded-full p-6 backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="text-white text-4xl h-8 w-8" />
                ) : (
                  <Play className="text-white text-4xl h-8 w-8 ml-1" />
                )}
              </button>
            </div>

            {/* Progress Bar and Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div 
                className="w-full h-2 bg-gray-600 rounded-full cursor-pointer mb-4"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button onClick={togglePlay} className="hover:text-blue-400 transition-colors">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  
                  <button onClick={toggleMute} className="hover:text-blue-400 transition-colors">
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  
                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowQualityMenu(!showQualityMenu)}
                      className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      <span className="text-sm">{quality}</span>
                    </button>

                    {showQualityMenu && (
                      <div className={`absolute bottom-8 right-0 ${theme.surface} rounded-lg shadow-lg p-2 min-w-[100px]`}>
                        {['720p', '1080p', '4K'].map((q) => (
                          <button
                            key={q}
                            onClick={() => {
                              setQuality(q);
                              setShowQualityMenu(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded hover:bg-blue-600 transition-colors ${
                              quality === q ? 'text-blue-400' : theme.text
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>{movie.title}</h2>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded font-bold">
                ★ {movie.rating}
              </span>
              <span className={theme.textSecondary}>{movie.year}</span>
              <span className={`${theme.surface} ${theme.text} px-2 py-1 rounded text-sm border ${theme.border}`}>
                {movie.genre}
              </span>
            </div>

            <p className={`${theme.textSecondary} text-lg leading-relaxed`}>
              {movie.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 transform hover:scale-105">
              <Play className="h-5 w-5" />
              <span>Watch Full Movie</span>
            </button>
            <button className={`${theme.surface} hover:bg-blue-600 hover:text-white ${theme.text} px-8 py-3 rounded-lg font-semibold transition-all duration-200 border ${theme.border} transform hover:scale-105`}>
              + Add to Watchlist
            </button>
          </div>

          {/* Preview Status */}
          <div className={`${theme.surface} rounded-lg p-4 text-center border ${theme.border}`}>
            <div className="text-blue-500 mb-2 text-2xl">🎬</div>
            <p className={theme.textSecondary}>
              {isPlaying ? `Preview playing... ${Math.ceil(duration - currentTime)}s remaining` : 'Preview ended - Watch full movie above'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPreviewModal;
