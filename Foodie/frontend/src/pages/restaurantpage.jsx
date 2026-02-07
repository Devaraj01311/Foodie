import React, { useEffect, useState } from "react";
import RestaurantMenu from "../Components/restaurantMenu";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, ChevronRight } from "lucide-react";

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;
  
  const images = [
    "/image/image.jpg", "/image/offer1.jpg", "/image/offer2.jpg"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/restaurants`)
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error(err));
  }, []);

  if (selectedRestaurant) {
    return <RestaurantMenu restaurant={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16">
        <Slider {...settings} className="rounded-[2.5rem] overflow-hidden shadow-2xl">
          {images.map((src, index) => (
            <div key={index} className="relative h-[300px] md:h-[500px]">
              <img src={src} className="w-full h-full object-cover" alt="Slide" />
              <div className="absolute inset-0 bg-stone-900/20" />
            </div>
          ))}
        </Slider>
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-amber-600 font-bold mb-2">Curated Collection</h2>
          <h3 className="text-4xl font-serif italic font-bold text-stone-900">Available Establishments</h3>
        </div>
        <p className="text-stone-400 text-sm max-w-xs italic">Selection of the city's finest dining experiences available for immediate delivery.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {restaurants.map((res) => (
          <motion.div
            key={res._id}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
            onClick={() => setSelectedRestaurant(res)}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 shadow-lg shadow-stone-200">
              <img src={res.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={res.name} />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                <Star size={14} className="fill-amber-500 text-amber-500" />
                <span className="text-xs font-bold text-stone-800">{res.rating}</span>
              </div>
            </div>
            
            <div className="px-2">
              <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mb-1">{res.cuisine}</p>
              <h4 className="text-2xl font-serif italic font-bold text-stone-900 group-hover:text-amber-600 transition-colors flex items-center justify-between">
                {res.name} <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </h4>
              <div className="flex items-center gap-1 text-stone-400 text-xs mt-2">
                <MapPin size={12} /> <span>Bengaluru Central</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantPage;