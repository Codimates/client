import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart data when modal is opened
  useEffect(() => {
    if (isOpen) {
      const fetchCartDetails = async () => {
        try {
          setLoading(true);
          const response = await axios.get('/order/getordersispayedfalse');
          
          // Assuming the API returns data in response.data.data
          const orders = response.data.data;
          
          // Flatten products from all unpaid orders
          const allProducts = orders.flatMap(order => 
            order.products.map(product => ({
              ...product,
              orderId: order._id, // Include order ID for potential future use
            }))
          );
          
          setCartItems(allProducts);
        } catch (err) {
          console.error('Error fetching cart details:', err);
          setError('Failed to load cart details');
        } finally {
          setLoading(false);
        }
      };

      fetchCartDetails();
    }
  }, [isOpen]);

  // Calculate total price of all cart items
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.total_price, 0).toFixed(2);
  };

  // Handler to remove an item from the cart
  const handleRemoveItem = async (orderId, productId) => {
    try {
      // You might need to implement a backend route to update the order
      // This is a placeholder and would need to be adjusted based on your backend
      await axios.put(`/order/${orderId}`, {
        products: cartItems.filter(item => 
          item.orderId === orderId && item.inventory_id !== productId
        )
      });

      // Update local state
      setCartItems(cartItems.filter(item => 
        item.orderId !== orderId || item.inventory_id !== productId
      ));
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item from cart');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg w-[500px] max-h-[80vh] flex flex-col">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Your Cart</h2>

        {loading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Loading cart details...</p>
          </div>
        )}

        {error && (
          <div className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!loading && cartItems.length === 0 && (
          <div className="flex items-center justify-center flex-grow">
            <p className="text-lg text-gray-500">Your cart is empty!</p>
          </div>
        )}

        {!loading && cartItems.length > 0 && (
          <div className="flex-grow pr-2 overflow-y-auto">
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li 
                  key={`${item.orderId}-${item.inventory_id}`} 
                  className="flex items-center justify-between pb-3 border-b"
                >
                  <div className="flex-grow">
                    <span className="font-medium">{item.inventory_id}</span>
                    <div className="text-gray-600">
                      {item.quantity} x ${item.unit_price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-green-600">
                      ${item.total_price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.orderId, item.inventory_id)}
                      className="text-red-500 transition-colors hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && cartItems.length > 0 && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-green-600">
              ${calculateTotalPrice()}
            </span>
          </div>
        )}

        <div className="flex justify-end mt-4 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Close
          </button>
          <button
            disabled={cartItems.length === 0}
            className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;