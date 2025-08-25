import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ category }) => {
    const {products} = useContext(AppContext);
    const [relatedProduct, setRelatedProduct] = useState([])

    const [loadedImages, setLoadedImages] = useState(new Set())

    useEffect(() => {
        setRelatedProduct(products.filter((data) => data?.category?.toLowerCase() == category?.toLowerCase()))
    }, [category, products])

    const handleImageLoad = (productId) => {
    setLoadedImages(prev => new Set(prev).add(productId))
  }
  return (
    <>
        <div className='max-w-7xl mx-auto text-center'>
            <h1>Related Product</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-9 p-0 sm:p-5 sm:gap-5 sm:w-[100%] w-[80%]">
                {relatedProduct?.map((product) => (
                    <div
                    key={product._id}
                    className="group relative bg-gradient-subtle rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden max-w-sm mx-auto"
                    >
                    {/* Background Gradient Effect */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl" />
        

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
                        <Link to={`/product/${product._id}`}>
                        <button className="px-4 py-2 bg-card/90 backdrop-blur-sm hover:bg-card text-foreground rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                            <Eye className="w-4 h-4" />
                            Quick View
                        </button>
                        </Link>
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
                        
                        <button className="px-1 py-2 bg-gradient-primary text-primary-foreground rounded-xl text-[13px] font-semibold hover:shadow-glow transition-all duration-300 group-hover:scale-105 flex items-center gap-2 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-90 group-hover:opacity-100 cursor-pointer hover:bg-green-500">
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>

        </div>
    </>
  )
}

export default RelatedProduct