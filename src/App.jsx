import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Products from './pages/Products';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/details/:type/:id" element={<Details />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
