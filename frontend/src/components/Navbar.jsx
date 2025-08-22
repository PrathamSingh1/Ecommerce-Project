import React, { useState } from "react";
import { Menu, X, ShoppingCart, Heart, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full shadow-md bg-white/70 backdrop-blur-md sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary cursor-pointer">
          MyStore
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">Shop</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">About</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">Contact</a>
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-5">
          <Heart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
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

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md px-6 py-4 space-y-4">
          <a href="#" className="block text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#" className="block text-foreground hover:text-primary transition-colors">Shop</a>
          <a href="#" className="block text-foreground hover:text-primary transition-colors">About</a>
          <a href="#" className="block text-foreground hover:text-primary transition-colors">Contact</a>
          <div className="flex gap-6 pt-4">
            <Heart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
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
