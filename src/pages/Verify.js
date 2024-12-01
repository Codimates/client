import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async ()=> {
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if (response.data.success) {
        navigate("/myorders");
        }
        else{navigate("/")}
    }

    useEffect(()=> {
        verifyPayment();
    },[])

  return (
        <div className="verify min-h-[60vh] grid">
            <div className="spinners w-[100px] h-[100px] place-self-center border-[5px] border-gray-400 border-t-green-500 rounded-full animate-spin"></div>
        </div>
  )
}

export default Verify