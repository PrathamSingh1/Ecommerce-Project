import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import RelatedProduct from './RelatedProduct';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/product/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setProduct(api.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const toggleAddToCart = () => {
    setIsAddToCart(prev => !prev);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
        Loading product...
      </div>
    );
  }

  return (
    <>
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Product Image */}
        <div className="relative bg-muted/20 rounded-2xl overflow-hidden shadow-soft">
            {product.imgSrc ? (
            <>
                <img
                src={product.imgSrc}
                alt={product.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                    imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl" />
                )}
            </>
            ) : (
            <div className="flex items-center justify-center h-96 text-muted-foreground text-sm">
                No Image Available
            </div>
            )}
            {/* Wishlist Button */}
            <button
            onClick={toggleAddToCart}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors duration-200"
            >
            <Heart
                className={`w-5 h-5 transition-colors duration-200 ${
                isAddToCart
                    ? "fill-accent text-accent"
                    : "text-muted-foreground hover:text-accent"
                }`}
            />
            </button>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-center space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground leading-tight hover:text-primary transition-colors duration-200">
            {product.title}
            </h1>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed">
            {product.description || "No description available for this product."}
            </p>

            {/* Price */}
            <div>
            <span className="text-3xl font-extrabold text-primary">
                ₹{product.price ? product.price.toLocaleString() : "N/A"}
            </span>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
            <button
                onClick={toggleAddToCart}
                className="flex items-center gap-2 px-6 py-3 border rounded-xl font-semibold transition-all duration-300 hover:bg-card hover:bg-green-500 cursor-pointer"
            >
                <ShoppingCart
                className={`w-5 h-5 ${
                    isAddToCart ? "fill-accent text-accent" : "text-muted-foreground"
                }`}
                />
                {isAddToCart ? "Added to Cart" : "Add to Cart"}
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl font-semibold shadow-soft transition-all duration-2s group-hover:scale-125 hover:bg-blue-500 cursor-pointer">
                {/* <ShoppingCart className="w-5 h-5" /> */}
                Buy Now
            </button>
            </div>
        </div>
        </div>

        <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
