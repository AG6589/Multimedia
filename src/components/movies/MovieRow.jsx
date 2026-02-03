import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { cn } from '../../utils/cn';

const MovieRow = ({ title, movies, onMovieClick }) => {
    const rowRef = useRef(null);

    const scroll = (direction) => {
        if (rowRef.current) {
            const scrollAmount = direction === 'left' ? -800 : 800;
            rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold px-4 md:px-8">{title}</h2>

            <div className="relative group/row">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-white dark:from-gray-950 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:scale-110"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                {/* Movies Container */}
                <div
                    ref={rowRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 py-2"
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="flex-none w-64 md:w-80">
                            <MovieCard movie={movie} onClick={() => onMovieClick(movie)} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-white dark:from-gray-950 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:scale-110"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

export default MovieRow;
