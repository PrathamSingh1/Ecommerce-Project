import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

const AppState = (props) => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  // const data = 10;
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/all`,
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      if (token) userProfile();
    };
    fetchProduct();
    userCart();
  }, [token]);

  useEffect(() => {
    let locatToken = localStorage.getItem("token");
    if (locatToken) {
      setToken(locatToken);
      setIsAuthenticated(true);
    }
  }, []);

  // register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

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

    return api.data;
  };

  // login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", api.data.token);

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

    return api.data;
  };

  // logout user
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);

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
  };

  // user profile
  const userProfile = async () => {
    try {
      const api = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      setUser(api.data.user);
    } catch (err) {
      console.error("Profile fetch failed", err);
      logout();
    }
  };

  // add to Cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: token,
        },
        withCredentials: true,
      }
    );
    // console.log("My Cart", api)

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
  };

  // user Cart
  const userCart = async () => {
    const api = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/cart/user`,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: token,
        },
        withCredentials: true,
      }
    );
    // console.log("User cart", api.data.cart)
    setCart(api.data.cart); 
    // setUser(api.data.user);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
