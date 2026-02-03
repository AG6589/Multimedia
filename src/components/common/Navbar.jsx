import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { cn } from '../../utils/cn';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const { getItemCount } = useCart();
    const { wishlist } = useWishlist();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Determine if we should search movies or products based on current page
            const searchPath = location.pathname.includes('product')
                ? `/products?search=${searchQuery}`
                : `/movies?search=${searchQuery}`;
            navigate(searchPath);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/movies' },
        { name: 'Products', path: '/products' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold gradient-text">StreamShop</div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-netflix-red',
                                    isActive(link.path)
                                        ? 'text-netflix-red'
                                        : 'text-gray-700 dark:text-gray-300'
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-64 px-4 py-2 pl-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-netflix-red transition-all"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                    </form>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>

                        <Link
                            to="/wishlist"
                            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Wishlist"
                        >
                            <Heart className="w-5 h-5" />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-netflix-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/cart"
                            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Shopping cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {getItemCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-amazon-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {getItemCount()}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-4 animate-slide-up">
                        <form onSubmit={handleSearch} className="px-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full px-4 py-2 pl-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            </div>
                        </form>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    'block px-4 py-2 rounded-lg transition-colors',
                                    isActive(link.path)
                                        ? 'bg-netflix-red text-white'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
