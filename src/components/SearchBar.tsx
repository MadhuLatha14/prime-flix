
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import moviesData from '../data/movies.json';

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const allMovies = [
    ...moviesData.trending,
    ...moviesData.popular,
    ...moviesData.action,
    ...moviesData.drama,
    ...moviesData.comedy
  ];

  useEffect(() => {
    if (query.trim()) {
      const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleMovieClick = (movie: any) => {
    const event = new CustomEvent('openPreviewModal', { detail: movie });
    window.dispatchEvent(event);
    onClose();
  };

  return (
    <div className="animate-fade-in">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search movies, shows, genres..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          autoFocus
        />
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-gray-800 mt-2 rounded-lg shadow-xl z-50 overflow-hidden">
          {results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="flex items-center space-x-3 p-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-12 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-white font-medium">{movie.title}</h4>
                <p className="text-gray-400 text-sm">{movie.genre} • {movie.year}</p>
              </div>
              <div className="text-orange-500 text-sm">★ {movie.rating}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
