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
    arrows: false, // Better for mobile
  };

  useEffect(() => {
    fetch("https://foodie-0b.onrender.com/api/restaurants")
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
    <div className="bg-gray-100 mt-2 mx-2 min-h-screen">
      
      {/* Slider */}
      <Slider {...settings} className="rounded-2xl overflow-hidden">
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[200px] sm:h-[300px] md:h-[450px] object-cover rounded-xl"
            />
          </div>
        ))}
      </Slider>

      {/* Restaurant List */}
      <div className="p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl text-orange-500 font-bold mb-4 sm:mb-6">
          Available Restaurants
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition flex flex-col"
            >
              {restaurant.image && (
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-40 sm:h-52 md:h-60 object-cover rounded-lg mb-3 transform transition-transform duration-300 ease-in-out hover:scale-105"
                />
              )}

              <h3 className="text-xl sm:text-2xl font-semibold">
                {restaurant.name}
              </h3>

              <div className="mt-2">
                <p className="text-gray-600 text-lg sm:text-xl">
                  {restaurant.cuisine}
                </p>
                <p className="text-gray-500 text-sm sm:text-lg mt-1">
                  ⭐ {restaurant.rating}
                </p>
              </div>

              <div className="flex-1"></div>

              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-600 transition text-sm sm:text-base"
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
