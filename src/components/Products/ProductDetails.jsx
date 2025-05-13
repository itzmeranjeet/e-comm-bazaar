import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../Cart/AuthContext";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { addToCart } = useCart();
  const { user } = useAuth();

  

  useEffect(() => {
    if (product?.thumbnail) {
      setMainImage(product.thumbnail);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to your cart");
      return;
    }
    
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color", { duration: 1000 });
      return;
    }
  
    const item = {
      productId: product.id,
      name: product.title,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      price: product.price,
      image: product.thumbnail,
    };
  
    addToCart(item);
    toast.success("Added to cart");
  };
  

  const getProduct = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) {
    return <div className="p-8 text-center">Loading product...</div>;
  }

  const colors = ["Red", "Blue", "Black"];
  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnails (desktop only) */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Product thumbnail ${idx}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === img ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              {mainImage && (
                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              )}
            </div>

            {/* Thumbnails (mobile) */}
            <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Product thumbnail ${idx}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === img ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Right side*/}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {product.title}
            </h1>
            <p className="text-xl text-gray-500 mb-2">${product.price}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* stock and ratimg */}
            <div className="mb-4 space-y-1 text-sm">
              <p>
                <strong>Stock:</strong>{" "}
                <span
                  className={`font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} Available`
                    : "Out of Stock"}
                </span>
              </p>
            </div>

            {/* color */}
            <div className="mb-4">
              <p className="text-gray-600">Color:</p>
              <div className="flex gap-2 mt-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "border-black border-4"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: "brightness(0.8)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* size  */}
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size ? "bg-black text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* quantity */}
            <div className="mb-6">
              <p className="text-gray-600">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-1 rounded text-lg bg-gray-200"
                >
                  -
                </button>
                <span className="px-2 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-1 rounded text-lg bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              disabled={isButtonDisabled}
              onClick={handleAddToCart}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 uppercase ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>

            {/* Characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{product.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Category</td>
                    <td className="py-1 capitalize">{product.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* rating and review */}
        <div className="">
          {product.reviews?.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Customer Reviews:</h3>
              <div className="space-y-4">
                {product.reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="border p-4 rounded-lg bg-gray-50 text-sm text-gray-700"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{review.reviewerName}</span>
                      <span className="text-yellow-500">
                        Rating: {review.rating}/5
                      </span>
                    </div>
                    <p className="italic">"{review.comment}"</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Similar Products Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-medium text-center mb-4">
            You May Also Like
          </h2>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
