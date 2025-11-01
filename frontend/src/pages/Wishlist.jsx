import React, { useEffect, useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, fetchWishlist, removeFromWishlist, loading } = useWishlist();
  const [pageLoading, setPageLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlist = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/login", { 
          state: { message: "Please login to view your wishlist" }
        });
        return;
      }
      
      setPageLoading(true);
      try {
        await fetchWishlist();
      } catch (error) {
        console.error("Failed to load wishlist:", error);
        if (error.message.includes("login")) {
          navigate("/login");
        }
      } finally {
        setPageLoading(false);
      }
    };

    loadWishlist();
  }, [fetchWishlist, navigate]);

  const handleRemove = async (productId) => {
    setRemovingId(productId);
    
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert(error.message || "Failed to remove item from wishlist");
    } finally {
      setRemovingId(null);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  if (pageLoading || loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Your Wishlist ❤️</h2>
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Your Wishlist ❤️</h2>
        <div className="text-center py-20">
          <div className="mb-8">
            <p className="text-2xl text-gray-600 mb-2">Your wishlist is empty</p>
            <p className="text-gray-500">Discover amazing products and add them to your wishlist!</p>
          </div>
          <button
            onClick={handleContinueShopping}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-medium"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-2">Your Wishlist ❤️</h2>
        <p className="text-center text-gray-600">
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.image || '/placeholder-image.jpg'}
                alt={item.title}
                className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition"
                onClick={() => handleProductClick(item._id)}
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
              <div className="absolute top-3 right-3 bg-pink-500 text-white p-1.5 rounded-full shadow-lg">
                <span className="text-sm">❤️</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 
                className="text-lg font-semibold cursor-pointer transition mb-2 line-clamp-2"
                onClick={() => handleProductClick(item._id)}
              >
                {item.title}
              </h3>
              
              <p className="text-2xl font-bold text-green-600 mb-2">
                ₹{item.ourPrice?.toLocaleString()}
              </p>
              
              {item.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleProductClick(item._id)}
                  className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg transition text-sm font-medium"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleRemove(item._id)}
                  disabled={removingId === item._id}
                  className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
                >
                  {removingId === item._id ? "..." : "Remove"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <button
          onClick={handleContinueShopping}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}