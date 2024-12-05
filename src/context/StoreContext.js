import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const[cartItems,setCartItems] = useState([]);
    const[cartId,setCartId] = useState("");
    const url = "http://localhost:4006";

    const storedUser = localStorage.getItem("user")
    const userInfo = JSON.parse(storedUser)
    const userId = userInfo._id;
    const userEmail = userInfo.email;
    

    useEffect(()=>{
        const loadCartData = async () => {
        try {
            const response = await axios.post(url+"/api/cart/get",{userId});
            if(response.data.success){
                setCartId(response.data.cart._id)
                setCartItems(response.data.cartData);
                }
            else {
                setCartItems([]);
            }
        } catch (error) {
            setCartItems([]);
        }
        
    }
    loadCartData();
    getTotalCartAmount();
    },[userId]);
    

    // To add an item to cart
    const addToCart = async (itemId, itemName, price, image) => {
        console.log(image);
        
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
                    image,
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
    const getTotalCartAmount = () => {
        if(userId){
        return cartItems.reduce((total, item) => {
            const itemPrice = item.price;
            const itemQuantity = item.quantity                        
            return total + itemPrice * itemQuantity;
        }, 0);
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
        userId,
        cartId,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
    
}

export default StoreContextProvider;