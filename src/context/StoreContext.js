import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const[cartItems,setCartItems] = useState([]);
    const url = "http://localhost:3000";
    const [user,setUser] = useState("");

    
    const storedUser = localStorage.getItem("user")
    const userInfo = JSON.parse(storedUser)
    const userId = userInfo._id;
    const userEmail = userInfo.email;
console.log(storedUser+ "cart");

    useEffect(()=>{
        const loadCartData = async () => {
        if(storedUser){
        const response = await axios.post(url+"/api/cart/get",{userId});
        setCartItems(response.data.cartData);
    }
    }
    loadCartData();
    },[userId]);


    // To add an item to cart
    const addToCart = async (itemId, itemName, price) => {
        setCartItems((prevCartItems) => {
            const existingItemIndex = prevCartItems.findIndex((item) => item.itemId === itemId);
    
            if (existingItemIndex !== -1) {
                const updatedCartItems = [...prevCartItems];
                updatedCartItems[existingItemIndex].quantity += 1;
                return updatedCartItems;
            } else {
                return [...prevCartItems, { itemId, itemName, price, quantity: 1 }];
            }
        });
    
        if (userId) {
            try {
                const data = {
                    userId,        
                    userEmail,       
                    itemId,
                    itemName,
                    price,
                };
    
                await axios.post(`${url}/api/cart/add`, data);
            } catch (error) {
                console.error("Error while adding to cart:", error);
            }
        }
    };
    
    // To remove an item from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prevCartItems) => {
            const existingItemIndex = prevCartItems.findIndex((item) => item.itemId === itemId);
    
            if (existingItemIndex !== -1) {
                const updatedCartItems = [...prevCartItems];
    
                if (updatedCartItems[existingItemIndex].quantity > 1) {
                    updatedCartItems[existingItemIndex].quantity -= 1;
                } else {
                    updatedCartItems.splice(existingItemIndex, 1); // If the item quantity is 1, remove it completely from cart
                }
    
                return updatedCartItems;
            }
    
            return prevCartItems; 
        });
    
        if (userId) {
            try {
                await axios.post(`${url}/api/cart/remove`, { userId, itemId });
            } catch (error) {
                console.error("Error while removing item from cart:", error);
            }
        }
    };
    
    // To calculate the total amount of the cart
    const getTotalCartAmount = (cartItems) => {
        if(cartItems){
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        } else {
            return 0;
        }
        
    };
     

    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
    
}

export default StoreContextProvider;