import { motion } from 'framer-motion';
import { Play, Info, Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

const MovieCard = ({ movie, onClick }) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const inWishlist = isInWishlist(movie.id, 'movie');

    const handleWishlist = (e) => {
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(movie.id, 'movie');
        } else {
            addToWishlist({ ...movie, type: 'movie' });
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative group cursor-pointer"
            onClick={onClick}
        >
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                        <h3 className="text-white font-bold text-lg line-clamp-1">{movie.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="text-green-400 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
                            <span>{movie.year}</span>
                            <span>{movie.duration}</span>
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-2">{movie.description}</p>

                        <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="primary" className="flex-1">
                                <Play className="w-4 h-4 mr-1" />
                                Play
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                                <Info className="w-4 h-4 mr-1" />
                                Info
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className={cn(
                        'absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all',
                        inWishlist
                            ? 'bg-netflix-red text-white'
                            : 'bg-black/50 text-white hover:bg-black/70'
                    )}
                >
                    <Heart className={cn('w-4 h-4', inWishlist && 'fill-current')} />
                </button>
            </div>

            {/* Title below card (visible when not hovering) */}
            <div className="mt-2 group-hover:opacity-0 transition-opacity">
                <h3 className="font-semibold text-sm line-clamp-1">{movie.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{movie.genre}</p>
            </div>
        </motion.div>
    );
};

export default MovieCard;
