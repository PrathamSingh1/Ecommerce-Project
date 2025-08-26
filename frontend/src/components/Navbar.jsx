import React, { useContext, useState } from "react";
import { Menu, X, ShoppingCart, User, Search, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [priceDropdown, setPriceDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated } = useContext(AppContext);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${inputSearch}`);
    setInputSearch("");
  };

  const filterByCategory = (cat) => {
    setFilteredData(products.filter((data) => data.category.toLowerCase() == cat.toLowerCase()))
  }

  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price <= price))
  }
 

  return (
    <nav className="w-full shadow-md bg-white/70 backdrop-blur-md sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
        {/* Left Section */}
        <div className="flex items-center gap-10 flex-shrink-0">
          <Link to={`/`} onClick={()=> setFilteredData(products)}>
            <div className="text-2xl font-bold text-primary mr-5 cursor-pointer">
              MyStore
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Shop</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>

        {/* Search Bar */}
        <form className="relative flex-1 sm:ml-[80px]" onSubmit={submitHandler}>
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
                <Link to={`/login`} className="text-foreground hover:text-primary transition-colors">Login</Link>
                <Link to={`/register`} className="text-foreground hover:text-primary transition-colors">Register</Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <div onClick={()=>{
                  logout();
                  navigate('/')
                }} className="text-foreground hover:text-primary transition-colors cursor-pointer">Logout</div>
                <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <User className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
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
          <a href="#" className="block text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#" className="block text-foreground hover:text-primary transition-colors">Shop</a>
          <a href="#" className="block text-foreground hover:text-primary transition-colors">About</a>
          <a href="#" className="block text-foreground hover:text-primary transition-colors">Contact</a>

          <div className="flex gap-6 pt-4">
            <a href="#" className="block text-foreground hover:text-primary transition-colors">Login</a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors">Logout</a>
            <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
            <User className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
          </div>
        </div>
      )}

      {/* Sub Navbar */}
      {location.pathname == '/' && (
        <div className="w-full border-t bg-muted/40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-4 justify-center items-center">
          {["electronics", "fashion", "home", "beauty", "sports"].map((item) => (
            <button
              onClick={()=>filterByCategory(item)}
              key={item}
              className="px-4 py-1.5 capitalize rounded-full text-sm font-medium bg-white shadow-sm text-foreground hover:bg-primary hover:text-[#666] transition-all cursor-pointer"
            >
              {item}
            </button>
          ))}

          {/* ✅ Dropdown with Checkboxes */}
          <div className="relative">
            <button
              onClick={() => setPriceDropdown(!priceDropdown)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white shadow-sm text-foreground hover:bg-primary hover:text-[#666] transition-all cursor-pointer"
            >
              Price <ChevronDown className="w-4 h-4" />
            </button>

            {priceDropdown && (
              <div className="absolute top-12 left-0 w-40 bg-white shadow-lg rounded-lg p-3 space-y-2 z-50">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    onClick={()=> filterByPrice(15000)}
                    className="accent-primary"
                  />
                  15000
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    onClick={() => filterByPrice(25000)}
                    className="accent-primary"
                  />
                  25000
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    onClick={() => filterByPrice(50000)}
                    className="accent-primary"
                  />
                  50000
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    onClick={() => filterByPrice(70000)}
                    className="accent-primary"
                  />
                  70000
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    onClick={() => filterByPrice(90000)}
                    className="accent-primary"
                  />
                  90000
                </label>
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
