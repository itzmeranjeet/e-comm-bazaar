import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Gallery = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [products, setProducts] = useState([]);

  const handleScrollButtons = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  const getGalleryProducts = async () => {
    try {
      const productData = await axios.get(
        "https://dummyjson.com/products?limit=1000"
      );
      const resData = productData.data;
      const filteredProducts = resData.products.filter(
        (product) =>
          product.category === "womens-dresses" ||
          product.category === "mens-shirts"
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getGalleryProducts();
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0 bg-gray-50">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Explore New Arrivals
        </h2>
        <p className="text-gray-500 text-lg">
          Discover the latest arrivals from our collection
        </p>
      </div>

      <div className="relative container mx-auto">
        <div className="absolute -top-14 right-0 flex gap-2 z-10">
          <button
            onClick={() => handleScrollButtons("left")}
            className={`p-2 rounded-full shadow border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => handleScrollButtons("right")}
            className={`p-2 rounded-full shadow border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
        <div
          ref={scrollRef}
          className="overflow-x-auto flex gap-6 scroll-smooth pb-2"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] max-w-sm bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 relative group"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600 mt-1">${product.price}</p>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                <Link
                  to={`/product/${product.id}`}
                  className="bg-white text-black px-4 py-2 rounded-lg shadow font-semibold hover:bg-gray-200 transition"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
