import React, { useState, useEffect } from "react";
import API from "../services/API";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MyRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    description: "",
    image: "",
  });

  const token = localStorage.getItem("token");

  const images = [
    "/image/restaurant.jpg",
    "/image/order1.jpg",
    "/image/image3.jpg",
    "/image/image2.jpg",
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
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await API.get("/restaurants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRestaurants(res.data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };

  const toggleAvailability = async (menuIndex) => {
    try {
      const res = await API.put(
        `/restaurants/menu/toggle/${selectedRestaurant._id}/${menuIndex}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedRestaurant((prev) => {
        const updatedMenu = [...prev.menu];
        updatedMenu[menuIndex] = res.data;
        return { ...prev, menu: updatedMenu };
      });
    } catch (err) {
      console.error("Error toggling availability:", err);
    }
  };

  const startEditing = (item, index) => {
    setEditingIndex(index);
    setFormData(item);
  };

  const saveUpdate = async (menuIndex) => {
    try {
      await API.put(
        `/restaurants/${selectedRestaurant._id}/menu/${menuIndex}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // refresh restaurant data
      const res = await API.get("/restaurants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = res.data.find((r) => r._id === selectedRestaurant._id);
      setSelectedRestaurant(updated);

      setEditingIndex(null);
    } catch (err) {
      console.error("Error updating menu item:", err);
    }
  };

  const filteredMenu =
    selectedRestaurant?.menu.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "veg"
          ? item.type?.toLowerCase() === "veg"
          : item.type?.toLowerCase() === "non-veg";
      return matchesSearch && matchesFilter;
    }) || [];

  if (selectedRestaurant) {
    return (
      <div>
        <div className="relative">
          <img
            src="/image/menu.png"
            alt="Restaurant"
            className="w-full h-80 object-cover rounded-t-lg rounded-b-2xl"
          />
          <h2 className="absolute inset-0 text-orange-300 ml-7 flex items-center justify-start text-3xl font-bold mt-1 drop-shadow-lg">
            My Restaurant
          </h2>
          <h2 className="absolute inset-0 ml-7 flex items-center justify-start text-4xl font-bold mt-20 text-white drop-shadow-lg">
            Menu
          </h2>
          <h2 className="absolute left-0 bottom-0 bg-white/80 px-4 py-3 text-3xl font-bold text-gray-800 mb-0 rounded-b-2xl w-full text-left">
            {selectedRestaurant.name}
          </h2>
        </div>

        <h3 className="text-2xl font-bold mt-3 ml-2 mb-4">
          {selectedRestaurant.name} Menu
        </h3>

  
        <div className="flex flex-col md:flex-row gap-4 mb-6 ml-2">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-1/3"
          />

          <div className="flex gap-2">
            {["all", "veg", "non-veg"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg ${
                  filter === f
                    ? f === "veg"
                      ? "bg-green-500 text-white"
                      : f === "non-veg"
                      ? "bg-red-500 text-white"
                      : "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
              onClick={() => setSelectedRestaurant(null)}
            >
              ←
            </button>
          </div>
        </div>

   
        <div className="grid gap-4 md:grid-rows-2">
          {filteredMenu.length === 0 ? (
            <p>No menu items found.</p>
          ) : (
            filteredMenu.map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl bg-gray-50 shadow-sm flex gap-4 items-center"
              >
                {editingIndex === index ? (
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="border p-1 w-full mb-2"
                    />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="border p-1 w-full mb-2"
                    />
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="border p-1 w-full mb-2"
                    />
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="border p-1 w-full mb-2"
                    />
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="border p-1 w-full mb-2"
                    />

                    <button
                      onClick={() => saveUpdate(index)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="px-3 py-1 bg-gray-400 text-white rounded ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src={item.image || "/image/default-food.jpg"}
                      alt={item.name}
                      className="w-30 h-40 object-cover rounded-3xl transform transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <p className="text-gray-600">{item.type}</p>
                      <p className="font-bold text-orange-600">₹{item.price}</p>
                      <p className="text-gray-500">{item.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => toggleAvailability(index)}
                        className={`px-2 py-1.5 rounded text-white ${
                          item.available
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {item.available ? "Available" : "Not Available"}
                      </button>
                      <button
                        onClick={() => startEditing(item, index)}
                        className="px-2 py-1.5 rounded text-white bg-blue-400 hover:bg-blue-500"
                      >
                        Update
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        <h3 className=" font-bold mt-3 ml-2 mb-4 flex justify-between items-center">
  {selectedRestaurant.name} Menu
  <button
    onClick={() => {
      setEditingIndex("new");
      setFormData({ name: "", price: "", type: "", description: "", image: "" });
    }}
    className="px-3  text-1xl py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500"
  >
    Add Menu
  </button>
</h3>

<div className="grid gap-4 md:grid-rows-2">
  {editingIndex === "new" && (
    <div className="p-4 border rounded-xl bg-gray-50 shadow-sm">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-1 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="border p-1 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Type (veg/non-veg)"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        className="border p-1 w-full mb-2"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border p-1 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        className="border p-1 w-full mb-2"
      />

      <button
        onClick={async () => {
          try {
            await API.post(
              `/restaurants/${selectedRestaurant._id}/menu`,
              formData,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            // Refresh restaurant data
            const res = await API.get("/restaurants", {
              headers: { Authorization: `Bearer ${token}` },
            });
            const updated = res.data.find((r) => r._id === selectedRestaurant._id);
            setSelectedRestaurant(updated);
            setEditingIndex(null);
          } catch (err) {
            console.error("Error adding menu:", err);
          }
        }}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        Save
      </button>
      <button
        onClick={() => setEditingIndex(null)}
        className="px-3 py-1 bg-gray-400 text-white rounded ml-2"
      >
        Cancel
      </button>
    </div>
  )}
 </div>
        
      </div>
    );
  }

  // Restaurant List
  return (
    <div>
      <div className="relative w-full h-80 mb-8 mt-3 ">
        <Slider {...settings} className="h-full">
          {images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Restaurant ${index + 1}`}
                className="w-full h-80 object-cover rounded-t-lg rounded-b-2xl"
              />
            </div>
          ))}
        </Slider>

        <h2 className="absolute inset-0 flex items-center justify-center text-4xl font-bold mt-8 text-white drop-shadow-lg pointer-events-none">
          Foodie's{" "}
          <span className="text-4xl ml-2 text-orange-300 font-bold">
            Delight
          </span>
        </h2>

        <h2 className="absolute left-0 bottom-0 bg-white/80 px-6 py-3 text-3xl font-bold text-gray-500 mb-0 rounded-b-2xl w-full text-left">
          Restaurants
        </h2>
      </div>

      {restaurants.length === 0 ? (
        <p className="text-gray-600">You haven’t added any restaurants yet.</p>
      ) : (
        <div className="space-y-4">
          {restaurants.map((rest) => (
            <div
              key={rest._id}
              className="p-4 border rounded-xl flex justify-between items-center bg-white shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={rest.image || "/image/default-restaurant.jpg"}
                  alt={rest.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm transform transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div>
                  <h4 className="font-semibold text-lg">{rest.name}</h4>
                  <p className="text-gray-600">
                    {rest.cuisine} | Rating: {rest.rating}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedRestaurant(rest)}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                View Menu
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRestaurant;
