import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/movies/Hero';
import MovieRow from '../components/movies/MovieRow';
import { SkeletonHero, SkeletonCard } from '../components/ui/Skeleton';
import moviesData from '../data/movies.json';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setMovies(moviesData);
            setLoading(false);
        }, 1000);
    }, []);

    const handleMovieClick = (movie) => {
        navigate(`/details/movie/${movie.id}`);
    };

    const trendingMovies = movies.filter((m) => m.category === 'trending');
    const popularMovies = movies.filter((m) => m.category === 'popular');
    const recommendedMovies = movies.filter((m) => m.category === 'recommended');
    const featuredMovie = movies[0];

    if (loading) {
        return (
            <div className="min-h-screen">
                <SkeletonHero />
                <div className="px-4 md:px-8 py-8 space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-12">
            <Hero movie={featuredMovie} />

            <div className="py-8 space-y-8">
                {trendingMovies.length > 0 && (
                    <MovieRow
                        title="Trending Now"
                        movies={trendingMovies}
                        onMovieClick={handleMovieClick}
                    />
                )}

                {popularMovies.length > 0 && (
                    <MovieRow
                        title="Popular on StreamShop"
                        movies={popularMovies}
                        onMovieClick={handleMovieClick}
                    />
                )}

                {recommendedMovies.length > 0 && (
                    <MovieRow
                        title="Recommended for You"
                        movies={recommendedMovies}
                        onMovieClick={handleMovieClick}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
