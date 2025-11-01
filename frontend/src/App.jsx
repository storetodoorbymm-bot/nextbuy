import { Routes, Route } from 'react-router-dom';
import React, { useState , useEffect} from "react";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Account from './pages/Account';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import CreateOrder from './components/CreateOrder';
import AdminRoute from './routes/AdminRoute';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ContactUs from "./pages/ContactUs";
import './style.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 750); 
    const hideTimer = setTimeout(() => setLoading(false), 1000); 
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center h-screen bg-white transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <img
          src="logo.png" 
          alt="NextBuy Logo"
          className="w-40 h-40 object-contain transition-transform duration-500"
        />
      </div>
    );
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>}/>
            <Route path="/orders"element={<ProtectedRoute><CreateOrder /></ProtectedRoute>}/>
            <Route path="/admin/add-product" element={<AdminRoute><AddProduct /></AdminRoute>}/>
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
