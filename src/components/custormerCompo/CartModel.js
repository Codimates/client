import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext'; // Adjust the import path as needed

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placeAddress, setPlaceAddress] = useState('');
  const { user } = useContext(UserContext);

  
 

// Fetch cart data and inventory details when modal is opened
useEffect(() => {
  const fetchCartDetails = async () => {
    if (!isOpen || !user) return;

    try {
      setLoading(true);
      // Fetch unpaid orders for the specific user
      const response = await axios.get(`/order/user/${user._id}/unpaid`);
      const orders = response.data.data;

      // Flatten products from all unpaid orders
      const userProducts = orders.flatMap(order => 
        order.products.map(product => ({
          ...product,
          orderId: order._id,
          place_address: order.place_address || '',
        }))
      );

      // Fetch inventory details for each product
      const inventoryDetailsPromises = userProducts.map(async (item) => {
        try {
          const inventoryResponse = await axios.get(`/inventory/getinventorybyid/${item.inventory_id}`);
          return {
            ...item,
            brand_name: inventoryResponse.data.brand_name || '',
            model_name: inventoryResponse.data.model_name || '',
            images: inventoryResponse.data.images || [], // Ensure images is an array
            image: inventoryResponse.data.images && inventoryResponse.data.images.length > 0 
              ? inventoryResponse.data.images[0] 
              : '' // Fallback for single image display
          };
        } catch (error) {
          console.error('Error fetching inventory details:', error);
          return {
            ...item,
            brand_name: '',
            model_name: '',
            images: [],
            image: ''
          };
        }
      });

      const detailedProducts = await Promise.all(inventoryDetailsPromises);

      setCartItems(detailedProducts);
      setPlaceAddress(detailedProducts[0]?.place_address || '');
    } catch (err) {
      console.error('Error fetching cart details:', err);
      setError('Failed to load cart details');
    } finally {
      setLoading(false);
    }
  };

  fetchCartDetails();
}, [isOpen, user]);

// Calculate total price of all cart items
const calculateTotalPrice = () => {
  return cartItems.reduce((total, item) => total + item.total_price, 0).toFixed(2);
};

  // Handle adding quantity to an item
  const handleAddQuantity = async (orderId, productId) => {
    try {
      // Find the current item
      const currentItem = cartItems.find(
        item => item.orderId === orderId && item.inventory_id === productId
      );

      if (!currentItem) return;

      // Calculate new quantity
      const newQuantity = currentItem.quantity + 1;

      // Update backend
      await axios.put(`/order/update/${orderId}`, {
        products: cartItems.map(item =>
          item.orderId === orderId && item.inventory_id === productId
            ? { 
                ...item, 
                quantity: newQuantity,
                total_price: newQuantity * item.unit_price
              }
            : item
        ),
        place_address: placeAddress
      });

      // Update local state
      setCartItems(cartItems.map(item =>
        item.orderId === orderId && item.inventory_id === productId
          ? { 
              ...item, 
              quantity: newQuantity,
              total_price: newQuantity * item.unit_price
            }
          : item
      ));
    } catch (err) {
      console.error('Error adding quantity:', err);
      setError('Failed to add quantity');
    }
  };

  // Handle decreasing quantity of an item
  const handleDecreaseQuantity = async (orderId, productId) => {
    try {
      // Find the current item
      const currentItem = cartItems.find(
        item => item.orderId === orderId && item.inventory_id === productId
      );

      if (!currentItem) return;

      // If quantity is 1, remove the item instead of decreasing
      if (currentItem.quantity === 1) {
        return handleRemoveItem(orderId, productId);
      }

      // Calculate new quantity
      const newQuantity = currentItem.quantity - 1;

      // Update backend
      await axios.put(`/order/update/${orderId}`, {
        products: cartItems.map(item =>
          item.orderId === orderId && item.inventory_id === productId
            ? { 
                ...item, 
                quantity: newQuantity,
                total_price: newQuantity * item.unit_price
              }
            : item
        ),
        place_address: placeAddress
      });

      // Update local state
      setCartItems(cartItems.map(item =>
        item.orderId === orderId && item.inventory_id === productId
          ? { 
              ...item, 
              quantity: newQuantity,
              total_price: newQuantity * item.unit_price
            }
          : item
      ));
    } catch (err) {
      console.error('Error decreasing quantity:', err);
      setError('Failed to decrease quantity');
    }
  };

  // Handler to remove an item from the cart
  const handleRemoveItem = async (orderId, productId) => {
    try {
      // Filter out the item to remove
      const updatedProducts = cartItems
        .filter(item => 
          !(item.orderId === orderId && item.inventory_id === productId)
        );

      // Update backend
      await axios.put(`/order/update/${orderId}`, {
        products: updatedProducts,
        place_address: placeAddress
      });

      // Update local state
      setCartItems(updatedProducts);
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item from cart');
    }
  };

  // Handle address change
  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setPlaceAddress(newAddress);

    // Update address for all orders
    cartItems.forEach(async (item) => {
      try {
        await axios.put(`/order/update/${item.orderId}`, {
          place_address: newAddress
        });
      } catch (err) {
        console.error('Error updating address:', err);
      }
    });
  };

  // Handle checkout process
  const handleCheckout = async () => {
    try {
      // Collect unique order IDs
      const orderIds = [...new Set(cartItems.map(item => item.orderId))];

      // Checkout with address
      await axios.post('/order/checkout', {
        orders: orderIds,
        place_address: placeAddress
      });

      // Clear cart or close modal after successful checkout
      setCartItems([]);
      onClose();
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to complete checkout');
    }
  };

  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg w-[600px] max-h-[80vh] flex flex-col">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Your Cart</h2>

        {/* Address Input */}
        <div className="mb-4">
          <label 
            htmlFor="place_address" 
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Delivery Address
          </label>
          <input
            type="text"
            id="place_address"
            value={placeAddress}
            onChange={(e) => setPlaceAddress(e.target.value)}
            placeholder="Enter delivery address"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
          <div className="flex items-center space-x-4">
            {/* Image display */}
            <div className="flex items-center space-x-2">
              {item.images && item.images.length > 0 ? (
                <div className="flex space-x-2">
                  {item.images.slice(0, 3).map((imageUrl, index) => (
                    <img 
                      key={index}
                      src={imageUrl} 
                      alt={`${item.brand_name} ${item.model_name} - Image ${index + 1}`} 
                      className="object-cover w-16 h-16 border rounded-lg"
                      onError={(e) => {
                        e.target.src = '/path/to/default/image.png';
                        e.target.onerror = null;
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center w-16 h-16 text-gray-500 bg-gray-200 rounded-lg">
                  No Image
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium">{item.brand_name || 'Unknown Brand'}</h3>
              <p>{item.model_name || 'Unknown Model'}</p>
              <p className="text-sm text-gray-500">
                Unit Price: ${item.unit_price ? item.unit_price.toFixed(2) : '0.00'}
              </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item.orderId, item.inventory_id)}
                        className="w-8 h-8 text-lg font-bold text-gray-600 border rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleAddQuantity(item.orderId, item.inventory_id)}
                        className="w-8 h-8 text-lg font-bold text-gray-600 border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold text-green-600">
                      Total: ${item.total_price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.orderId, item.inventory_id)}
                      className="text-red-500 hover:text-red-700"
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
            onClick={handleCheckout}
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