import React, { useEffect, useState } from 'react'
import AppContext from './AppContext';
import axios from "axios";

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
  }, [])
  return (
    <AppContext.Provider value={{
        products
    }}>{props.children}</AppContext.Provider>
  )
}

export default AppState