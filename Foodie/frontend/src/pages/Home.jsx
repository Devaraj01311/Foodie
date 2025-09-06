import React from "react";
import { Link } from "react-router-dom";
import RestaurantPage from "./restaurantpage";
import Contact from "./ContactPage";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      <section>
        <div className="min-h-[70vh] mt-2 flex flex-col items-center justify-center text-center bg-gradient-to-r from-red-400 to-orange-400 px-4 rounded-t-3xl rounded-b-3xl ml-2 mb-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Delicious Food, <br /> Delivered To You 🍕
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Order from your favorite restaurants near you.
          </p>
          <Link
            to="/restaurants"
            className="bg-white text-red-500 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            Explore Restaurants
          </Link>
        </div>
      </section>
      <RestaurantPage /> 
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
