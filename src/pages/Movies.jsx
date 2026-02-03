import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MovieCard from '../components/movies/MovieCard';
import { SkeletonCard } from '../components/ui/Skeleton';
import moviesData from '../data/movies.json';

const Movies = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setMovies(moviesData);
            setLoading(false);
        }, 800);
    }, []);

    useEffect(() => {
        let result = [...movies];

        // Apply search filter
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            result = result.filter((movie) =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply genre filter
        if (selectedGenre !== 'all') {
            result = result.filter((movie) => movie.genre === selectedGenre);
        }

        setFilteredMovies(result);
    }, [movies, selectedGenre, searchParams]);

    const genres = ['all', ...new Set(movies.map((m) => m.genre))];

    const handleMovieClick = (movie) => {
        navigate(`/details/movie/${movie.id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen px-4 md:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(12)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 md:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6">Movies</h1>

            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-4 py-2 rounded-full transition-all ${selectedGenre === genre
                                ? 'bg-netflix-red text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                            }`}
                    >
                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </button>
                ))}
            </div>

            {/* Movies Grid */}
            {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onClick={() => handleMovieClick(movie)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        No movies found
                    </p>
                </div>
            )}
        </div>
    );
};

export default Movies;
