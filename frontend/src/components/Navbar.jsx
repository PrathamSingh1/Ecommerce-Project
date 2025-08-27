import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import Profile from "./user/Profile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [priceDropdown, setPriceDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null); // 👈 ref for click outside
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated } =
    useContext(AppContext);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${inputSearch}`);
    setInputSearch("");
  };

  const filterByCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() === cat.toLowerCase()
      )
    );
  };

  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price <= price));
  };

  // Close Profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full shadow-md bg-white/70 backdrop-blur-md sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
        {/* Left Section */}
        <div className="flex items-center gap-10 flex-shrink-0">
          <Link to={`/`} onClick={() => setFilteredData(products)}>
            <div className="text-2xl font-bold text-primary mr-5 cursor-pointer">
              MyStore
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Shop
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <form
          className="relative flex-1 sm:ml-[80px]"
          onSubmit={submitHandler}
        >
          <input
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="sm:w-[70%] w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 shadow-sm focus:outline-none transition text-black"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden md:flex items-center gap-5">
            {!isAuthenticated && (
              <>
                <Link
                  to={`/login`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to={`/register`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Register
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link to={`/cart`} className="relative">
                <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">10</p>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <User
                    onClick={() => setShowProfile((prev) => !prev)}
                    className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                  />
                  {showProfile && (
                    <Profile
                      onLogout={() => {
                        logout();
                        navigate("/");
                        setShowProfile(false);
                      }}
                    />
                  )}
                </div>
              </>
            )}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md px-6 py-4 space-y-4">
          <a
            href="#"
            className="block text-foreground hover:text-primary transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-foreground hover:text-primary transition-colors"
          >
            Shop
          </a>
          <a
            href="#"
            className="block text-foreground hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="block text-foreground hover:text-primary transition-colors"
          >
            Contact
          </a>

          <div className="flex gap-6 pt-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to={`/login`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to={`/register`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Logout
                </div>
                <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <User
                  onClick={() => setShowProfile((prev) => !prev)}
                  className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer"
                />
                {showProfile && (
                  <Profile
                    onLogout={() => {
                      logout();
                      navigate("/");
                      setShowProfile(false);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Sub Navbar */}
      {location.pathname === "/" && (
        <div className="w-full border-t bg-muted/40">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-4 justify-center items-center">
            {["electronics", "fashion", "home", "beauty", "sports"].map(
              (item) => (
                <button
                  onClick={() => filterByCategory(item)}
                  key={item}
                  className="px-4 py-1.5 capitalize rounded-full text-sm font-medium bg-white shadow-sm text-foreground hover:bg-primary hover:text-[#666] transition-all cursor-pointer"
                >
                  {item}
                </button>
              )
            )}

            {/* Price Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPriceDropdown(!priceDropdown)}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white shadow-sm text-foreground hover:bg-primary hover:text-[#666] transition-all cursor-pointer"
              >
                Price <ChevronDown className="w-4 h-4" />
              </button>

              {priceDropdown && (
                <div className="absolute top-12 left-0 w-40 bg-white shadow-lg rounded-lg p-3 space-y-2 z-50">
                  {[15000, 25000, 50000, 70000, 90000].map((price) => (
                    <label
                      key={price}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        onClick={() => filterByPrice(price)}
                        className="accent-primary"
                      />
                      {price}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
