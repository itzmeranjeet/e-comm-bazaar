import React from "react";
import mensCollImage from "../../assets/men.jpg";
import womensCollImage from "../../assets/women.jpg";
import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* women */}
        <div className="relative flex-1 group overflow-hidden rounded-xl shadow-md">
          <img
            loading="lazy"
            src={womensCollImage}
            alt="Women's Collection"
            className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h2>
            <Link to="/collections/women" className="text-gray-900 underline">
              Shop Now
            </Link>
          </div>
        </div>

        {/* men */}
        <div className="relative flex-1 group overflow-hidden rounded-xl shadow-md">
          <img
            loading="lazy"
            src={mensCollImage}
            alt="Men's Collection"
            className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h2>
            <Link to="/collections/men" className="text-gray-900 underline">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
