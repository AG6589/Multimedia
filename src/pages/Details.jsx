import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SkeletonHero, SkeletonText } from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import moviesData from '../data/movies.json';
import productsData from '../data/products.json';
import TrailerModal from '../components/movies/TrailerModal';
import { fetchMovieTrailer } from '../utils/tmdb';

const Details = () => {

    const { type, id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [fetchingTrailer, setFetchingTrailer] = useState(false);
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    useEffect(() => {
        setTimeout(() => {
            const data = type === 'movie' ? moviesData : productsData;
            const found = data.find((i) => i.id === Number(id));
            setItem(found);
            setLoading(false);
        }, 600);
    }, [type, id]);

    if (loading) {
        return (
            <div className="min-h-screen px-4 md:px-8 py-8">
                <SkeletonHero />
                <div className="mt-8 max-w-4xl">
                    <SkeletonText lines={5} />
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Item not found</h2>
                    <Button onClick={() => navigate(-1)}>Go Back</Button>
                </div>
            </div>
        );
    }

    const inWishlist = isInWishlist(item.id, type);

    const handleWishlist = () => {
        if (inWishlist) {
            removeFromWishlist(item.id, type);
        } else {
            addToWishlist({ ...item, type });
        }
    };

    const handleAddToCart = () => {
        if (type === 'product') {
            addToCart(item);
        }
    };

    const handlePlayTrailer = async () => {
        if (type !== 'movie') return;

        setIsModalOpen(true);
        if (!trailerUrl) {
            setFetchingTrailer(true);
            const url = await fetchMovieTrailer(item.title);
            if (url) {
                setTrailerUrl(url);
            } else if (item.trailer) {
                // Fallback to local data if TMDB fails
                const youtubeId = item.trailer.split('v=')[1];
                setTrailerUrl(`https://www.youtube.com/embed/${youtubeId}`);
            }
            setFetchingTrailer(false);
        }
    };

    const discountedPrice = type === 'product'
        ? item.price * (1 - (item.discount || 0) / 100)
        : null;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={item.backdrop || item.image}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-32 relative z-10">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6 md:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1 space-y-4">
                            <h1 className="text-3xl md:text-4xl font-bold">
                                {item.title || item.name}
                            </h1>

                            {type === 'movie' ? (
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <span className="px-3 py-1 bg-netflix-red text-white rounded font-semibold">
                                        {item.rating} ★
                                    </span>
                                    <span>{item.year}</span>
                                    <span>{item.duration}</span>
                                    <span className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded">
                                        {item.genre}
                                    </span>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(item.rating)
                                                        ? 'fill-amazon-orange text-amazon-orange'
                                                        : 'text-gray-300 dark:text-gray-600'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="font-semibold">{item.rating}</span>
                                        <span className="text-gray-500 dark:text-gray-400">
                                            ({item.reviews.toLocaleString()} reviews)
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        {item.category}
                                    </p>
                                </div>
                            )}

                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                {item.description}
                            </p>

                            {type === 'movie' && item.cast && (
                                <div>
                                    <h3 className="font-semibold mb-2">Cast</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {item.cast.join(', ')}
                                    </p>
                                </div>
                            )}

                            {type === 'product' && item.specs && (
                                <div>
                                    <h3 className="font-semibold mb-2">Specifications</h3>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                                        {item.specs.map((spec, index) => (
                                            <li key={index}>{spec}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Action Panel */}
                        <div className="md:w-80 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                            {type === 'product' && (
                                <>
                                    <div className="space-y-2">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-3xl font-bold">
                                                ${discountedPrice.toFixed(2)}
                                            </span>
                                            {item.discount > 0 && (
                                                <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        {item.discount > 0 && (
                                            <span className="inline-block px-2 py-1 bg-netflix-red text-white text-sm rounded">
                                                Save {item.discount}%
                                            </span>
                                        )}
                                    </div>

                                    {!item.inStock && (
                                        <div className="text-red-600 font-semibold">
                                            Out of Stock
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="space-y-3">
                                {type === 'movie' ? (
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="w-full"
                                        onClick={handlePlayTrailer}
                                        disabled={fetchingTrailer}
                                    >
                                        <Play className={`w-5 h-5 mr-2 ${fetchingTrailer ? 'animate-pulse' : ''}`} />
                                        {fetchingTrailer ? 'Loading...' : 'Watch Trailer'}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        className="w-full"
                                        onClick={handleAddToCart}
                                        disabled={!item.inStock}
                                    >
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </Button>
                                )}

                                <Button
                                    variant={inWishlist ? 'danger' : 'outline'}
                                    size="lg"
                                    className="w-full"
                                    onClick={handleWishlist}
                                >
                                    <Heart className={`w-5 h-5 mr-2 ${inWishlist ? 'fill-current' : ''}`} />
                                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TrailerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                trailerUrl={trailerUrl}
                title={item.title || item.name}
            />
        </div>
    );
};

export default Details;
