import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/API";
import RestaurantFooter from "../Components/RestaurantFooter";

const RestaurantAdmin = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    cuisine: "",
    rating: "",
    image: "",
  });

  const [menu, setMenu] = useState([
    { name: "", price: "", type: "veg", description: "", image: "" },
  ]);

  const [restaurants, setRestaurants] = useState([]);

  const token = localStorage.getItem("token");

  const fetchRestaurants = async () => {
    try {
      const res = await API.get("/restaurants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRestaurants(res.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleMenuChange = (index, e) => {
    const { name, value } = e.target;
    const newMenu = [...menu];
    newMenu[index][name] = value;
    setMenu(newMenu);
  };

  const addMenuItem = () => {
    setMenu((prev) => [
      ...prev,
      { name: "", price: "", type: "veg", description: "", image: "" },
    ]);
  };

  const removeMenuItem = (index) => {
    setMenu((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (
      !restaurant.name ||
      !restaurant.cuisine ||
      !restaurant.rating ||
      !restaurant.image
    ) {
      alert("Please fill all restaurant details");
      return;
    }

    if (
      menu.length === 0 ||
      menu.some(
        (item) =>
          !item.name || !item.price || !item.type || !item.description || !item.image
      )
    ) {
      alert("Please fill all menu item details");
      return;
    }

    try {
      const res = await API.post(
        "/restaurants",
        { ...restaurant, menu },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        alert("Restaurant added successfully!");
        setRestaurant({ name: "", cuisine: "", rating: "", image: "" });
        setMenu([{ name: "", price: "", type: "veg", description: "", image: "" }]);
        fetchRestaurants(); 
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
       <>   
        <section>
      <div className="min-h-[70vh] mt-2 flex flex-col items-center justify-center text-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-4 rounded-t-3xl rounded-b-3xl mb-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          Manage Your Restaurant 
        </h1>
        <p className="text-lg md:text-xl text-white mb-8">
          Add menu items, update availability, and view orders in one place.
        </p>
        <Link
          to="/admin/restaurants"
          className="bg-white text-red-500 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          My Restaurant
        </Link>
      </div>
    </section>
    <div className="w-full bg-gray-100 mx-auto p-6">
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-3xl font-bold mb-6 text-center first-letter:2xl">Add Restaurant</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Restaurant Name"
              value={restaurant.name}
              onChange={handleRestaurantChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <input
              type="text"
              name="cuisine"
              placeholder="Cuisine (e.g., Italian, Indian)"
              value={restaurant.cuisine}
              onChange={handleRestaurantChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              value={restaurant.rating}
              onChange={handleRestaurantChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              min="1"
              max="5" />
            <input
              type="text"
              name="image"
              placeholder="Restaurant Image URL"
              value={restaurant.image}
              onChange={handleRestaurantChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>

          <h3 className="text-2xl font-bold mt-8 mb-4">Menu Items</h3>
          {menu.map((item, idx) => (
            <div key={idx} className="border p-4 rounded-xl mb-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-lg">Item {idx + 1}</h4>
                {menu.length > 1 && (
                  <button
                    onClick={() => removeMenuItem(idx)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => handleMenuChange(idx, e)}
                  className="w-full p-2 border rounded-lg" />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleMenuChange(idx, e)}
                  className="w-full p-2 border rounded-lg" />
                <select
                  name="type"
                  value={item.type}
                  onChange={(e) => handleMenuChange(idx, e)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleMenuChange(idx, e)}
                  className="w-full p-2 border rounded-lg" />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={item.image}
                  onChange={(e) => handleMenuChange(idx, e)}
                  className="w-full p-2 border rounded-lg" />
              </div>
            </div>
          ))}
          <button
            onClick={addMenuItem}
            className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition mb-6"
          >
            Add Menu 
          </button>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-orange-300 text-white rounded-lg font-bold hover:bg-orange-400 transition"
          >
            Submit
          </button>
        </div>
        <RestaurantFooter />
      </div>
  
      </>
  );
};

export default RestaurantAdmin;
