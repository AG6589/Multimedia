import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center space-y-4">
                    <ShoppingBag className="w-24 h-24 mx-auto text-gray-400" />
                    <h2 className="text-2xl font-bold">Your cart is empty</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Add some products to get started!
                    </p>
                    <Button onClick={() => navigate('/products')}>
                        Browse Products
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 md:px-8 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                    <Button variant="ghost" onClick={clearCart} className="text-red-600">
                        Clear Cart
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => {
                            const discountedPrice = item.price * (1 - (item.discount || 0) / 100);
                            return (
                                <div
                                    key={item.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded"
                                    />

                                    <div className="flex-1 space-y-2">
                                        <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {item.category}
                                        </p>

                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-bold">
                                                ${discountedPrice.toFixed(2)}
                                            </span>
                                            {item.discount > 0 && (
                                                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-4 font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-bold">
                                            ${(discountedPrice * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4 sticky top-20">
                            <h2 className="text-xl font-bold">Order Summary</h2>

                            <div className="space-y-2 py-4 border-t border-b border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <span className="font-semibold">${getTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                                    <span className="font-semibold">${(getTotal() * 0.1).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${(getTotal() * 1.1).toFixed(2)}</span>
                            </div>

                            <Button variant="secondary" size="lg" className="w-full">
                                Proceed to Checkout
                            </Button>

                            <Button
                                variant="outline"
                                size="md"
                                className="w-full"
                                onClick={() => navigate('/products')}
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
