import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

const ProductCard = ({ product, onClick }) => {
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id, 'product');

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleWishlist = (e) => {
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product.id, 'product');
        } else {
            addToWishlist({ ...product, type: 'product' });
        }
    };

    const discountedPrice = product.price * (1 - (product.discount || 0) / 100);

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
            onClick={onClick}
        >
            <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                />

                {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-netflix-red text-white px-2 py-1 rounded text-xs font-bold">
                        -{product.discount}%
                    </div>
                )}

                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                )}

                <button
                    onClick={handleWishlist}
                    className={cn(
                        'absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all',
                        inWishlist
                            ? 'bg-netflix-red text-white'
                            : 'bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800'
                    )}
                >
                    <Heart className={cn('w-4 h-4', inWishlist && 'fill-current')} />
                </button>
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {product.category}
                    </p>
                    <h3 className="font-semibold text-sm line-clamp-2 mt-1">
                        {product.name}
                    </h3>
                </div>

                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amazon-orange text-amazon-orange" />
                    <span className="font-semibold text-sm">{product.rating}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({product.reviews.toLocaleString()})
                    </span>
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">
                        ${discountedPrice.toFixed(2)}
                    </span>
                    {product.discount > 0 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                        </span>
                    )}
                </div>

                <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
