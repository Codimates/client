import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.js';
import { useNavigate } from 'react-router-dom';
import Headbar from '../components/HomePage/Headbar.js';

const Cart = () => {
  const { cartItems, removeFromCart, url, getTotalCartAmount, userId } = useContext(StoreContext);
  const navigate = useNavigate();
  

  return (
    <div>
      <Headbar/>
      <div className="cart-items mt-[100px]">
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className="h-[1px] bg-gray-300 border-none" />
        {cartItems.map((item, index) => {
            return (
              <div key={index}>
                <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center my-[10px] text-black">
                <div className="flex items-center justify-center">
                        <img
                        src={item.image}
                        alt=""
                        className="w-[50px] h-auto object-contain"
                        />
                    </div>
                  <p>{item.itemName}</p>
                  <p>${item.price}</p>
                  <p>{item.quantity}</p>
                  <p>${item.price * item.quantity}</p>
                  <p
                    onClick={() => removeFromCart(item.itemId)}
                    className="cursor-pointer text-red-500"
                  >
                    x
                  </p>
                </div>
                <hr className="h-[1px] bg-gray-300 border-none" />
              </div>
            );
        })}
      </div>
      <div className="flex flex-col md:flex-row-reverse justify-between gap-[max(12vw,20px)] mt-[80px]">
        <div className="flex-1 flex flex-col gap-[30px] mx-[30px]">
          <h2 className="text-2xl font-bold text-gray-800">Cart Total</h2>
          <div className="flex justify-between text-gray-600">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr className="h-[1px] bg-gray-300 border-none" />
          <div className="flex justify-between text-gray-600">
            <p>Delivery fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 20}</p>
          </div>
          <hr className="h-[1px] bg-gray-300 border-none" />
          <div className="flex justify-between text-gray-600">
            <p>Total</p>
            <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</p>
          </div>
          <button
            onClick={() => {
              navigate('/placeorder');
            }}
            className="border-none bg-[#f97316] w-[max(5vw,200px)] py-[12px] rounded-[4px] cursor-pointer mb-[10px]"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;