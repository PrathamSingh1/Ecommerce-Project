import React, { useEffect, useState } from 'react'
import AppContext from './AppContext';
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify'; 

const AppState = (props) => {
  const [products, setProducts] = useState([]);
  // const data = 10;
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/all`,{
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      })
      console.log(api.data.products);
      setProducts(api.data.products)
    }
    fetchProduct();
  }, []);

  // register user
  const register = async (name, email, password) => {
    const api = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`,{name, email, password}, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    })

    toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });

    return api.data
  }

  return (
    <AppContext.Provider value={{
        products,
        register
    }}>{props.children}</AppContext.Provider>
  )
}

export default AppState