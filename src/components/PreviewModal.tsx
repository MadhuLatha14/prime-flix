
import React, { useState, useEffect } from 'react';

interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  rating: string;
  year: string;
  description: string;
}

const PreviewModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      setMovie(event.detail);
      setIsOpen(true);
    };

    window.addEventListener('openPreviewModal', handleOpenModal as EventListener);
    
    return () => {
      window.removeEventListener('openPreviewModal', handleOpenModal as EventListener);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setMovie(null), 300);
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] animate-scale-in">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors duration-200"
        >
          ✕
        </button>

        {/* Header with Poster */}
        <div className="relative h-64 md:h-80">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white/20 hover:bg-white/30 rounded-full p-6 backdrop-blur-sm transition-colors duration-200">
              <div className="text-white text-4xl">▶</div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-orange-500 text-black px-3 py-1 rounded font-bold">
                ★ {movie.rating}
              </span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                {movie.genre}
              </span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
              <span>▶</span>
              <span>Play Now</span>
            </button>
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200">
              + Add to Watchlist
            </button>
          </div>

          {/* Trailer Placeholder */}
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-2">🎬</div>
            <p className="text-gray-400">Trailer Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
