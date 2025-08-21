import React, { useEffect } from 'react'
import AppContext from './AppContext';
import axios from "axios";

const AppState = (props) => {
  const data = 10;
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/all`,{
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      })
      console.log(api);
    }
    fetchProduct();
  }, [])
  return (
    <AppContext.Provider value={{
        data
    }}>{props.children}</AppContext.Provider>
  )
}

export default AppState