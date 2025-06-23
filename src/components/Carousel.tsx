
import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  rating: string;
  year: string;
  description: string;
}

interface CarouselProps {
  title: string;
  movies: Movie[];
}

const Carousel = ({ title, movies }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="group relative">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ArrowRight className="h-6 w-6" />
      </button>

      {/* Movies Container */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
