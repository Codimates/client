import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Headbar from '../components/HomePage/Headbar.js';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, url, userId, cartId } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderData = {
      userId: userId,
      cartId: cartId,
      address: data,
      items: cartItems,
      amount: getTotalCartAmount() + 20,
    };
    let response = await axios.post(url + '/api/order/place', orderData);
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert('Error');
    }
    
    
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [userId]);

  return (
    <div>
        <Headbar/>
    <form className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-12 mt-16 mx-[20px]" onSubmit={placeOrder}>
        
      {/* Left Section */}
      <div className="w-full max-w-[min(100%,500px)]">
        <p className="text-2xl font-semibold mb-12">Delivery Details</p>
        <div className="flex gap-2">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-[#f97316]"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-[#f97316]"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email"
          className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-[#f97316]"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-[#f97316]"
        />
        <div className="flex gap-2">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-[#f97316]"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-[#f97316]"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-[#f97316]"
        />
      </div>

      {/* Right Section */}
      <div className="mt-1 w-full max-w-[min(40%,500px)]">
        <div className="total">
          <h2 className="text-xl font-bold mb-4">Cart Total</h2>
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <p>Delivery fee</p>
            <p>$20</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p>${getTotalCartAmount() + 20}</p>
          </div>
          <button
            type="submit"
            className="bg-[#f97316] text-white py-2 px-4 rounded mt-6 hover:bg-[#ed9224] transition-colors duration-200"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default PlaceOrder;
