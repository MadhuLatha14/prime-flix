
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  rating: string;
  year: string;
  description: string;
  previewVideoUrl?: string;
  duration?: string;
}

interface CarouselProps {
  title: string;
  movies: Movie[];
}

const Carousel = ({ title, movies }: CarouselProps) => {
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      
      setTimeout(checkScrollButtons, 300);
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [movies]);

  return (
    <div className="group relative mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl md:text-3xl font-bold ${theme.text} transition-colors duration-300`}>
          {title}
        </h2>
        <div className="hidden md:flex items-center space-x-2">
          <span className={`text-sm ${theme.textSecondary}`}>
            {movies.length} titles
          </span>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 transform ${
          canScrollLeft 
            ? 'bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 hover:scale-110' 
            : 'opacity-0 pointer-events-none'
        } backdrop-blur-sm`}
        style={{ top: 'calc(50% + 20px)' }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 transform ${
          canScrollRight 
            ? 'bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 hover:scale-110' 
            : 'opacity-0 pointer-events-none'
        } backdrop-blur-sm`}
        style={{ top: 'calc(50% + 20px)' }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Movies Container */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-8 -mx-4 px-4"
        onScroll={checkScrollButtons}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory'
        }}
      >
        {movies.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="flex-none" style={{ scrollSnapAlign: 'start' }}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      
      {/* Gradient Overlays for Scroll Indication */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  );
};

export default Carousel;
