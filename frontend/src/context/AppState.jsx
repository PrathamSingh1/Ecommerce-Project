import React, { useEffect, useState } from 'react'
import AppContext from './AppContext';
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify'; 

const AppState = (props) => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
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
      setFilteredData(api.data.products)
    }
    fetchProduct();
  }, [token]);

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

  // login user
  const login = async (email, password) => {
    const api = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,{ email, password}, {
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

    setToken(api.data.token)
    setIsAuthenticated(true)
    localStorage.setItem('token', token)
    return api.data
  }

  // logout user
  const logout = () => {
    setIsAuthenticated(false)
    setToken(" ")
    localStorage.removeItem('token')

    toast.success("Logout Successfully", {
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
  }

  return (
    <AppContext.Provider value={{
        products,
        register,
        login,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout
    }}>{props.children}</AppContext.Provider>
  )
}

export default AppState