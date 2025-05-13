import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGalleryProducts = async () => {
    try {
      setLoading(true);
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
      console.error("Failed fetch products ", error);
    }
  };

  useEffect(() => {
    getGalleryProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
        {products.map((product, index) => (
          <Link key={index} to={`/product/${product._id}`} className="block">
            <div className=" bg-white p-4 rounded-lg">
              <div className=" w-full h-96 mb-4">
                <img
                  src={product?.thumbnail}
                  alt={product.name}
                  className=" w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className=" text-sm mb-2"> {product.name}</h3>
              <p className=" text-gray-500 font-medium text-sm tracking-tighter">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
