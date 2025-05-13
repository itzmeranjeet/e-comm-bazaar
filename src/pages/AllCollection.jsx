import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const categoryMap = {
  men: "mens-shirts",
  women: "womens-dresses",
  "top-wear": "tops", // Add other mappings as needed
};

const AllCollection = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGalleryProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://dummyjson.com/products?limit=1000"
      );
      const allProducts = response.data.products;

      const matchedCategory = categoryMap[category.toLowerCase()];

      const filtered = allProducts.filter(
        (product) => product.category === matchedCategory
      );
      setProducts(filtered);
    } catch (error) {
      console.error("Failed fetch products ", error);
    }
  };

  useEffect(() => {
    getGalleryProducts();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-8 capitalize text-gray-700">
        {category} Collection
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-white text-black px-4 py-2 rounded-lg shadow font-semibold hover:bg-gray-200 transition">
                  Add to Cart
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {product.title || "No Name"}
                </h3>
                <p className="text-gray-600 mt-1">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCollection;
