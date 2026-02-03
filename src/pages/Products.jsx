import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import Filters from '../components/products/Filters';
import { SkeletonCard } from '../components/ui/Skeleton';
import productsData from '../data/products.json';

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState(3000);
    const [sortBy, setSortBy] = useState('featured');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setProducts(productsData);
            setLoading(false);
        }, 800);
    }, []);

    useEffect(() => {
        let result = [...products];

        // Apply search filter
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            result = result.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply category filter
        if (selectedCategory !== 'all') {
            result = result.filter((product) => product.category === selectedCategory);
        }

        // Apply price filter
        result = result.filter((product) => {
            const price = product.price * (1 - (product.discount || 0) / 100);
            return price <= priceRange;
        });

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => {
                    const priceA = a.price * (1 - (a.discount || 0) / 100);
                    const priceB = b.price * (1 - (b.discount || 0) / 100);
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                result.sort((a, b) => {
                    const priceA = a.price * (1 - (a.discount || 0) / 100);
                    const priceB = b.price * (1 - (b.discount || 0) / 100);
                    return priceB - priceA;
                });
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        setFilteredProducts(result);
    }, [products, selectedCategory, priceRange, sortBy, searchParams]);

    const categories = [...new Set(products.map((p) => p.category))];

    const handleProductClick = (product) => {
        navigate(`/details/product/${product.id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen px-4 md:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                        <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[...Array(9)].map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 md:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6">Products</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <Filters
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                </div>

                {/* Products Grid */}
                <div className="lg:col-span-3">
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Showing {filteredProducts.length} of {products.length} products
                    </div>
                    <ProductGrid
                        products={filteredProducts}
                        onProductClick={handleProductClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;
