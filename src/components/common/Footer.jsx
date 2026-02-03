import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold gradient-text mb-4">StreamShop</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md">
                            Your one-stop destination for streaming entertainment and shopping the latest products.
                            Experience the best of Netflix and Amazon in one place.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-netflix-red transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/movies" className="text-gray-600 dark:text-gray-400 hover:text-netflix-red transition-colors">
                                    Movies
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-netflix-red transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/wishlist" className="text-gray-600 dark:text-gray-400 hover:text-netflix-red transition-colors">
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-netflix-red hover:text-white transition-all"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-netflix-red hover:text-white transition-all"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-netflix-red hover:text-white transition-all"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; {currentYear} StreamShop. Built with React, Tailwind CSS, and ❤️</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
