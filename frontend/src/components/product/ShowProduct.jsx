import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { Heart, ShoppingCart, Eye } from 'lucide-react'

const ShowProduct = () => {
  const {products} = useContext(AppContext)
  const [wishlistedItems, setWishlistedItems] = useState(new Set())
  const [loadedImages, setLoadedImages] = useState(new Set())

  const handleWishlist = (productId) => {
    setWishlistedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const handleImageLoad = (productId) => {
    setLoadedImages(prev => new Set(prev).add(productId))
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-9 p-0 sm:p-6 sm:gap-8 sm:w-[100%] w-[80%]">
      {products?.map((product) => (
        <div
          key={product._id}
          className="group relative bg-gradient-subtle rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden max-w-sm mx-auto"
        >
          {/* Background Gradient Effect */}
          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl" />
          
          {/* Wishlist Button */}
          <button
            onClick={() => handleWishlist(product._id)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors duration-200"
          >
            <Heart 
              className={`w-4 h-4 transition-colors duration-200 ${
                wishlistedItems.has(product._id) 
                  ? 'fill-accent text-accent' 
                  : 'text-muted-foreground hover:text-accent'
              }`}
            />
          </button>

          {/* Product Image */}
          <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-muted/20">
            {product.imgSrc ? (
              <>
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    loadedImages.has(product._id) ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(product._id)}
                  loading="lazy"
                />
                {!loadedImages.has(product._id) && (
                  <div className="absolute inset-0 bg-muted animate-pulse rounded-xl" />
                )}
              </>
            ) : (
              <div className="w-full h-full bg-muted rounded-xl flex items-center justify-center">
                <div className="text-muted-foreground text-sm">No Image</div>
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Quick Actions */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button className="px-4 py-2 bg-card/90 backdrop-blur-sm hover:bg-card text-foreground rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Quick View
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-3 relative">
            {/* Title */}
            <h2 className="font-semibold text-foreground text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {product.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description || "No description available."}
            </p>

            {/* Price & Button */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">
                  ₹{product.price ? product.price.toLocaleString() : "N/A"}
                </span>
              </div>
              
              <button className="px-4 py-2 bg-gradient-primary text-primary-foreground rounded-xl text-sm font-semibold hover:shadow-glow transition-all duration-300 group-hover:scale-105 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowProduct