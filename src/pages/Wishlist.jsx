import { useNavigate } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        navigate(`/details/${item.type}/${item.id}`);
    };

    const handleAddToCart = (item, e) => {
        e.stopPropagation();
        if (item.type === 'product') {
            addToCart(item);
        }
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center space-y-4">
                    <Heart className="w-24 h-24 mx-auto text-gray-400" />
                    <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Save your favorite movies and products here!
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => navigate('/movies')}>
                            Browse Movies
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/products')}>
                            Browse Products
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 md:px-8 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div
                            key={`${item.type}-${item.id}`}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer group hover:shadow-xl transition-all"
                            onClick={() => handleItemClick(item)}
                        >
                            <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                                <img
                                    src={item.image}
                                    alt={item.title || item.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />

                                <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                                    {item.type === 'movie' ? 'Movie' : 'Product'}
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromWishlist(item.id, item.type);
                                    }}
                                    className="absolute top-2 right-2 p-2 bg-netflix-red text-white rounded-full hover:bg-netflix-red/90 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-4 space-y-3">
                                <div>
                                    <h3 className="font-semibold line-clamp-2">
                                        {item.title || item.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {item.genre || item.category}
                                    </p>
                                </div>

                                {item.type === 'movie' ? (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="px-2 py-1 bg-netflix-red text-white rounded text-xs">
                                            {item.rating} ★
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {item.year}
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-lg font-bold">
                                            ${(item.price * (1 - (item.discount || 0) / 100)).toFixed(2)}
                                        </div>
                                        {item.inStock && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="w-full"
                                                onClick={(e) => handleAddToCart(item, e)}
                                            >
                                                Add to Cart
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
