import { cn } from '../../utils/cn';

const Filters = ({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
    sortBy,
    onSortChange
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
            <div>
                <h3 className="font-semibold text-lg mb-4">Category</h3>
                <div className="space-y-2">
                    <button
                        onClick={() => onCategoryChange('all')}
                        className={cn(
                            'block w-full text-left px-3 py-2 rounded transition-colors',
                            selectedCategory === 'all'
                                ? 'bg-amazon-orange text-white'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        )}
                    >
                        All Products
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={cn(
                                'block w-full text-left px-3 py-2 rounded transition-colors',
                                selectedCategory === category
                                    ? 'bg-amazon-orange text-white'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                            Max: ${priceRange}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="3000"
                            step="50"
                            value={priceRange}
                            onChange={(e) => onPriceRangeChange(Number(e.target.value))}
                            className="w-full mt-2"
                        />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-lg mb-4">Sort By</h3>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
