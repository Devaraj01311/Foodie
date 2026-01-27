import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Navbar = ({ type }) => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-2 ">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to={token ? "/home" : "/"}
          className="text-red-500 font-extrabold text-3xl tracking-wide hover:text-red-600 transition"
        >
          FOODIE
        <div className="flex items-center mr-3 text-sm ">
          <i className="fas fa-map-marker-alt"></i>
          <span className="ml-1 text-gray-800 font-thin hover:text-red-500 transition text-sm">Bengaluru</span>
        </div>
        </Link>
       {type === "main" && ( 
      
  <div className="flex-1 flex justify-center space-x-6">
    <Link
      to="/home"
      className="text-gray-700 font-medium hover:text-red-500 transition"
    >
      Home
    </Link>
    <Link
      to="/restaurants"
      className="text-gray-700 font-medium hover:text-red-500 transition"
    >
      Restaurants
    </Link>
    <Link
      to="/cart"
      className="text-gray-700 font-medium hover:text-red-500 transition"
    >
      Cart
    </Link>
    <Link
      to="/orders"
      className="text-gray-700 font-medium hover:text-red-500 transition"
    >
      Orders
    </Link>
  </div>
)}
       {type === "admin" && (
  <div className="flex-1 flex justify-center space-x-6">
    <Link to="/admin" className="text-gray-700 hover:text-red-500">Home</Link>
    <Link to="/admin/orders" className="text-gray-700 hover:text-red-500">Orders</Link>
    <Link to="/admin/restaurants" className="text-gray-700 hover:text-red-500">Restaurants</Link>
    <Link to="/admin/Editrestaurants" className="text-gray-700 hover:text-red-500">Menu Handle</Link>
  </div>
)}


        <div className="flex items-center space-x-4">
          {type === "auth" ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-red-500 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 font-medium hover:text-red-500 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              
          {type === "main" && token && (
         <Link to="/cart" className="relative">
         <FaShoppingCart className="text-gray-700 text-2xl hover:text-red-500 transition" />
         {cart.length > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
        {cart.reduce((sum, item) => sum + item.qty, 0)}
          </span>
        )}
      </Link>
    )}
              {token && (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg font-medium shadow-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
