import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const storedUser = localStorage.getItem('user');
  const userInfo = JSON.parse(storedUser);
  const userId = userInfo._id;

  const { getTotalCartAmount, cartItems, url } = useContext(StoreContext);

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
    let OrderData = {
      userId: userId,
      address: data,
      items: cartItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + '/api/order/place', OrderData);
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert('Error');
      console.log(response.data);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [userId, getTotalCartAmount, navigate]);

  return (
    <form className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-12 mt-16" onSubmit={placeOrder}>
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
            className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-green-500"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-green-500"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email"
          className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-green-500"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-green-500"
        />
        <div className="flex gap-2">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-green-500"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-green-500"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          className="mb-4 w-full p-2 border border-gray-300 rounded-md outline-green-500"
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
            <p>$2</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p>${getTotalCartAmount() + 2}</p>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded mt-6 hover:bg-green-700 transition-colors duration-200"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
