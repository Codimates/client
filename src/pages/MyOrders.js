import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext.js';
import axios from 'axios';
import Headbar from '../components/HomePage/Headbar.js';



const MyOrders = () => {

    const [data,setData] = useState([]);
    const {url} = useContext(StoreContext);

    const storedUser = localStorage.getItem("user")
    const userInfo = JSON.parse(storedUser)
    const userId = userInfo._id;

    useEffect(()=> {
        const fetchOrders = async () => {
            const response = await axios.post(url+"/api/order/userorders",{userId});
            setData(response.data.data);   
        }
        if(userId){
            fetchOrders();
        }
        
    },[userId])

  return (
    <div className="my-orders mb-16">
        <Headbar/>
    <h2 className="text-3xl font-bold mt-10 text-gray-800 text-center">My Orders</h2>
    <div className="container flex flex-col gap-5 mt-8">
        {data.map((order, index) => (
            <div
                key={index}
                className="order grid grid-cols-[0.5fr_2.5fr_1fr_1fr_1fr] items-center gap-7 text-sm p-4 text-gray-700 border border-green-500 rounded-md"
            >
                <p>
                    {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                            return `${item.itemName} x ${item.quantity}`;
                        } else {
                            return `${item.itemName} x ${item.quantity}, `;
                        }
                    })}
                </p>
                <p className="text-gray-900 font-bold">${order.amount}</p>
                <p>Items: {order.items.length}</p>
                <p>
                    <span className="text-green-500">&#x25cf;</span>
                    <b className="font-medium text-gray-700">{order.status}</b>
                </p>
            </div>
        ))}
    </div>
</div>

  )
}

export default MyOrders