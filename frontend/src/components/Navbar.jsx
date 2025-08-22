import React, { useState } from "react";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${inputSearch}`);
    setInputSearch("")
  }

  return (
    <nav className="w-full shadow-md bg-white/70 backdrop-blur-md sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
        {/* Left Section */}
        <div className="flex items-center gap-10 flex-shrink-0">
          {/* Logo */}
          <Link to={`/`}>
          <div className="text-2xl font-bold text-primary mr-5 cursor-pointer">
            MyStore
          </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Shop</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>

        {/* Search Bar (center, full on mobile, fixed on desktop) */}
        <form className="relative flex-1 sm:ml-[80px]" onSubmit={submitHandler}>
          <input
            value={inputSearch}
            onChange={(e)=>setInputSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="sm:w-[70%] w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 shadow-sm focus:outline-none transition text-black"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-5">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Login</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Register</a>
            <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <User className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
          </div>

          {/* Mobile Menu Button */}
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
            <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
            <User className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
          </div>
        </div>
      )}

      {/* Sub Navbar */}
      <div className="w-full border-t bg-muted/40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-4 justify-center">
          {["Electronics", "Fashion", "Home", "Beauty", "Sports"].map((item) => (
            <button
              key={item}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-white shadow-sm text-foreground hover:bg-primary hover:text-white transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
