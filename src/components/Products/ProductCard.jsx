import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, index }) => {
  return (
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
  );
};

export default ProductCard;
