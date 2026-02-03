import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (item) => {
        setWishlist((prev) => {
            const exists = prev.find((i) => i.id === item.id && i.type === item.type);
            if (exists) return prev;
            return [...prev, { ...item, addedAt: new Date().toISOString() }];
        });
    };

    const removeFromWishlist = (itemId, type) => {
        setWishlist((prev) =>
            prev.filter((item) => !(item.id === itemId && item.type === type))
        );
    };

    const isInWishlist = (itemId, type) => {
        return wishlist.some((item) => item.id === itemId && item.type === type);
    };

    const clearWishlist = () => setWishlist([]);

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
