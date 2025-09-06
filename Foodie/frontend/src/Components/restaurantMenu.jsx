import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const RestaurantMenu = ({ restaurant }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [add, setAdd] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (restaurant?.menu) {
      setAdd(Array(restaurant.menu.length).fill(0));
    }
  }, [restaurant]);

  const handleAdd = (idx) => {
    setAdd((prev) =>
      prev.map((count, i) => (i === idx ? count + 1 : count))
    );
  };

  const handleSubtract = (idx) => {
    setAdd((prev) =>
      prev.map((count, i) => (i === idx && count > 0 ? count - 1 : count))
    );
  };

  const filteredMenu = restaurant.menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ? true : item.type?.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mt-5">
      <div className="relative">
        <img
          src="/image/restaurant.jpg"
          alt="Restaurant"
          className="w-full h-80 object-cover rounded-t-lg rounded-b-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center mt-8">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            Foodie's <span className="text-orange-300">Delight</span>
          </h2>
        </div>
        <h2 className="absolute left-0 bottom-0 bg-white/80 px-6 py-3 text-3xl font-bold text-gray-500 mb-0 rounded-b-2xl w-full text-left">
          Menu
        </h2>
      </div>

      <div className="flex gap-4 mt-4 ml-2 mb-6">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-30 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="w-30 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <FaArrowLeft />
          </button>
        </div>
      </div>
      {filteredMenu.length > 0 ? (
        filteredMenu.map((item, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center p-4 border rounded-xl mb-3 shadow-sm bg-white ${
              item.available === false ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-end gap-4">
           
              <div className="relative w-44 h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl shadow-sm z-0 transform transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <h4 className="absolute  top-36 transform transition-transform duration-300 ease-in-out hover:scale-110 rounded text-gray-900 text-lg bg-gray-200/80 w-full font-bold ">
                  {item.name}
                </h4>
              </div>

              <div>
                <h4 className="font-semibold text-xl">{item.name}</h4>
                <p className="text-gray-600">₹{item.price}</p>
                {item.type && (
                  <p
                    className={`text-sm font-medium ${
                      item.type.toLowerCase() === "veg"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type}
                  </p>
                )}
                <p className="text-gray-500">{item.description}</p>
                {!item.available && (
                  <p className="mt-1 text-sm text-red-500 font-semibold">
                    Not Available
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => handleSubtract(idx)}
                className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                disabled={!item.available}
              >
                -
              </button>
              <span className="px-4">{add[idx]}</span>
              <button
                onClick={() => handleAdd(idx)}
                className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                disabled={!item.available}
              >
                +
              </button>
              <button
                onClick={() => {
                  addToCart({ ...item, qty: add[idx] || 1 }, restaurant._id)
                  alert(`${item.name} added to cart`) ;
                }}
                className="px-3 py-3 bg-orange-400 text-white rounded-xl hover:bg-orange-600 ml-4 transition"
                disabled={!item.available}
              >
                Add
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No items found.</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
