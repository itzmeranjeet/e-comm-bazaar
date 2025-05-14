import React from "react";
import heroImg from "../../assets/heroimage.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative mt-0.5">
      <img
        loading="lazy"
        src={heroImg}
        alt="Vacation Ready"
        className="w-full h-[400px] md:h-[600px] lg:h-[580px] object-cover brightness-75 transition duration-700 ease-in-out"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center p-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight uppercase mb-4 drop-shadow-lg transition-all duration-500 hover:tracking-wider">
            Vacation <br /> Ready
          </h1>
          <p className="text-base md:text-xl mb-6 opacity-90">
            Explore our vacation-ready products
          </p>
          <Link
            to="/collection/all"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md text-lg font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
