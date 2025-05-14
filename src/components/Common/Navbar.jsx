import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight, HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../Cart/AuthContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hamBurger, setHamBurger] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();

  console.log("USER :", user);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleHamBurger = () => setHamBurger(!hamBurger);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <header className="border-b border-gray-200 shadow-sm sticky top-0 bg-white z-40">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-gray-800"
          >
            E-comm <span className="text-red-600">Bazaar</span>
          </Link>
          <div className="hidden md:flex space-x-8 text-sm font-semibold text-gray-600">
            <Link to="/collections/men" className="hover:text-black transition">
              Men
            </Link>
            <Link
              to="/collections/women"
              className="hover:text-black transition"
            >
              Women
            </Link>
            <Link
              to="/collections/topwear"
              className="hover:text-black transition"
            >
              Topwear
            </Link>
          </div>

          <div className="flex items-center space-x-5">
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{user.displayName}</span>
                <button
                  onClick={logout}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="hover:text-black transition">
                <HiOutlineUser className="h-6 w-6 text-gray-700" />
              </Link>
            )}

            <button
              onClick={toggleCartDrawer}
              className="relative hover:text-black transition"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* hamburger menu */}
            <button className="md:hidden" onClick={toggleHamBurger}>
              <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </nav>
        <CartDrawer
          drawerOpen={drawerOpen}
          toggleCartDrawer={toggleCartDrawer}
        />
      </header>

      {/* mobile device Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          hamBurger ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleHamBurger}>
            <IoMdClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Menu</h2>
          <nav className="space-y-4 text-lg font-medium text-gray-700">
            <Link
              to="/collections/men"
              onClick={toggleHamBurger}
              className="block hover:text-black"
            >
              Men
            </Link>
            <Link
              to="/collections/women"
              onClick={toggleHamBurger}
              className="block hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/collections/topwear"
              onClick={toggleHamBurger}
              className="block hover:text-black"
            >
              Topwear
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
