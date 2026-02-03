import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import TrailerModal from './TrailerModal';
import { fetchMovieTrailer } from '../../utils/tmdb';

const Hero = ({ movie }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [fetchingTrailer, setFetchingTrailer] = useState(false);

    if (!movie) return null;

    const handlePlayTrailer = async () => {
        setIsModalOpen(true);
        if (!trailerUrl) {
            setFetchingTrailer(true);
            const url = await fetchMovieTrailer(movie.title);
            setTrailerUrl(url);
            setFetchingTrailer(false);
        }
    };

    return (
        <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={movie.backdrop || movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl space-y-6"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                        {movie.title}
                    </h1>

                    <div className="flex items-center gap-4 text-white">
                        <span className="px-3 py-1 bg-netflix-red rounded text-sm font-semibold">
                            {movie.rating} ★
                        </span>
                        <span className="text-lg">{movie.year}</span>
                        <span className="text-lg">{movie.duration}</span>
                        <span className="px-3 py-1 border border-white/50 rounded text-sm">
                            {movie.genre}
                        </span>
                    </div>

                    <p className="text-lg text-gray-200 line-clamp-3 drop-shadow-md">
                        {movie.description}
                    </p>

                    <div className="flex gap-4">
                        <Button
                            size="lg"
                            variant="primary"
                            className="shadow-xl"
                            onClick={handlePlayTrailer}
                            disabled={fetchingTrailer}
                        >
                            <Play className={`w-5 h-5 mr-2 ${fetchingTrailer ? 'animate-pulse' : ''}`} />
                            {fetchingTrailer ? 'Loading...' : 'Watch Trailer'}
                        </Button>
                        <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30">
                            <Info className="w-5 h-5 mr-2" />
                            More Info
                        </Button>
                    </div>

                    <div className="text-sm text-gray-300">
                        <span className="font-semibold">Cast: </span>
                        {movie.cast?.join(', ')}
                    </div>
                </motion.div>
            </div>

            <TrailerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                trailerUrl={trailerUrl}
                title={movie.title}
            />
        </div>
    );
};

export default Hero;
