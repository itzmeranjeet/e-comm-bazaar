import React from "react";
import heroImg from "../../assets/heroimage.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      <img
        loading="lazy"
        src={heroImg}
        alt="Vacation Ready"
        className="w-full h-[400px] md:h-[600px] lg:h-[520px] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-white text-center p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4 transition duration-500">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vacation ready products
          </p>
          <Link
            to="/collection/all"
            className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg font-medium transition-transform duration-300 hover:scale-105 hover:bg-gray-200"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
