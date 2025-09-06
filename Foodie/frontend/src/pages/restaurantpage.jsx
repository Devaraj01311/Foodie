
import React, { useEffect, useState } from "react";
import RestaurantMenu from "../Components/restaurantMenu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

   const images = [
    "/image/image.jpg",
    "/image/offer1.jpg",
    "/image/offer2.jpg",
    "/image/offer3.jpg",
    "/image/offer4.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  useEffect(() => {
    fetch("http://localhost:6001/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  }, []);

  if (selectedRestaurant) {
    return (
      <RestaurantMenu
        restaurant={selectedRestaurant}
        onBack={() => setSelectedRestaurant(null)}
      />
    );
  }

  return (
    <div className="bg-gray-100 mt-2 ml-2 mr-2 min-h-screen">
       <Slider {...settings} className="h-full">
        {images.map((src, index) => (
        <div key={index}>
          <img
          src={src}
          alt={`Restaurant ${index + 1}`}
className="w-full h-[450px] object-cover object-center rounded-t-lg rounded-b-2xl"
          />
        </div>
        ))}
      </Slider>
      <div className="p-8">
      <h2 className="text-3xl text-orange-500 font-bold mb-6">
        Available Restaurants
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
        <div
          key={restaurant._id}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col h-full"
        >
          {restaurant.image && (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-60 object-cover rounded-lg mb-4 transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
          )}
          <h3 className="text-2xl font-semibold">{restaurant.name}</h3>
          <div className="mt-2">
          <p className="text-gray-600 text-2xl">{restaurant.cuisine}</p>
          <p className="text-gray-500 text-1xl mt-2">⭐{restaurant.rating}</p>
          </div>
          <div className="flex-1"></div>
          <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-600 transition"
            onClick={() => setSelectedRestaurant(restaurant)}
          >
            View
          </button>
          </div>
        </div>
        ))}
      </div>
      </div>
      
    </div>
    );
};

export default RestaurantPage;
