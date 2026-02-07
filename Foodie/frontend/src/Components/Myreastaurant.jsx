import React, { useState, useEffect } from "react";
import API from "../services/API";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { 
  ChevronLeft, 
  Plus, 
  Edit2, 
  Check, 
  X, 
  Search, 
  Utensils, 
  Star,
  Image as ImageIcon
} from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MyRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", price: "", type: "veg", description: "", image: "",
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
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await API.get("/api/restaurants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRestaurants(res.data);
    } catch (err) {
      toast.error("Failed to load restaurants");
    }
  };

  const handleToggle = async (index) => {
    try {
      const res = await API.put(
        `/api/restaurants/menu/toggle/${selectedRestaurant._id}/${index}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedMenu = [...selectedRestaurant.menu];
      updatedMenu[index] = res.data;
      setSelectedRestaurant({ ...selectedRestaurant, menu: updatedMenu });
      toast.success("Availability updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const saveUpdate = async (menuIndex) => {
    setLoading(true);
    try {
      const endpoint = editingIndex === "new" 
        ? `/api/restaurants/${selectedRestaurant._id}/menu`
        : `/api/restaurants/${selectedRestaurant._id}/menu/${menuIndex}`;
      
      const method = editingIndex === "new" ? 'post' : 'put';
      
      await API[method](endpoint, formData, { 
        headers: { Authorization: `Bearer ${token}` } 
      });

      const res = await API.get("/api/restaurants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = res.data.find((r) => r._id === selectedRestaurant._id);
      setSelectedRestaurant(updated);
      setEditingIndex(null);
      toast.success(editingIndex === "new" ? "Added successfully" : "Updated successfully");
    } catch (err) {
      toast.error("Action failed");
    } finally {
      setLoading(false);
    }
  };

  const filteredMenu = selectedRestaurant?.menu.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" ? true : item.type?.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  }) || [];

  // --- SUB-COMPONENTS ---

  const MenuCard = ({ item, index }) => (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center group active:scale-[0.98] transition-transform"
    >
      <div className="relative overflow-hidden rounded-2xl w-full sm:w-32 h-32">
        <img
          src={item.image || "/image/default-food.jpg"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.type === 'veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {item.type}
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
        <p className="text-gray-400 text-sm line-clamp-2 mb-2 leading-relaxed">{item.description}</p>
        <span className="text-xl font-bold text-amber-600">₹{item.price}</span>
      </div>

      <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
        <button
          onClick={() => handleToggle(index)}
          className={`flex-1 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            item.available ? "bg-stone-800 text-white" : "bg-gray-100 text-gray-400"
          }`}
        >
          {item.available ? "In Stock" : "Out of Stock"}
        </button>
        <button
          onClick={() => { setEditingIndex(index); setFormData(item); }}
          className="p-2.5 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
        >
          <Edit2 size={18} />
        </button>
      </div>
    </motion.div>
  );

  const EditForm = ({ isNew }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100 space-y-4"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-gray-800">{isNew ? "New Creation" : "Edit Item"}</h3>
        <button onClick={() => setEditingIndex(null)} className="text-gray-400 hover:text-gray-600"><X /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          placeholder="Dish Name" 
          className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-amber-400 outline-none transition-all"
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="number" placeholder="Price" 
          className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-amber-400 outline-none transition-all"
          value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
        />
        <select 
          className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-amber-400 outline-none appearance-none bg-white"
          value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
        >
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>
        <input 
          placeholder="Image URL" 
          className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-amber-400 outline-none transition-all"
          value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
        />
        <textarea 
          placeholder="Description" 
          className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-amber-400 outline-none transition-all md:col-span-2"
          value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>
      <button 
        disabled={loading}
        onClick={() => saveUpdate(editingIndex)}
        className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200"
      >
        {loading ? "Processing..." : "Save Menu Item"}
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">

      
      <AnimatePresence mode="wait">
        {!selectedRestaurant ? (
          // --- RESTAURANT LIST VIEW ---
          <motion.div 
            key="list"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto px-4 pt-4"
          >
            <div className="relative h-72 mb-12 rounded-[2rem] overflow-hidden shadow-2xl">
              <Slider {...settings}>
                {images.map((src, i) => (
                  <div key={i} className="relative h-72">
                    <img src={src} className="w-full h-full object-cover" alt="slide" />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                ))}
              </Slider>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <motion.h1 
                  initial={{ y: 20 }} animate={{ y: 0 }}
                  className="text-5xl font-serif font-bold italic"
                >
                  Foodie's <span className="text-amber-300">Delight</span>
                </motion.h1>
                <p className="mt-2 tracking-[0.2em] text-sm uppercase opacity-80">Curated Gastronomy</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Utensils className="text-amber-500" /> Your Establishments
            </h2>

            {restaurants.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400">No restaurants found. Start your journey today.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {restaurants.map((rest) => (
                  <motion.div
                    whileHover={{ y: -5 }}
                    key={rest._id}
                    className="group bg-white p-5 rounded-[2rem] flex flex-col sm:flex-row justify-between items-center shadow-sm border border-gray-100 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-6 w-full">
                      <div className="relative h-20 w-20 shrink-0">
                        <img src={rest.image || "/image/default-restaurant.jpg"} className="w-full h-full object-cover rounded-2xl shadow-inner" alt="" />
                        <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-1 rounded-lg text-[10px] flex items-center">
                          <Star size={10} fill="currentColor" /> {rest.rating}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{rest.name}</h4>
                        <p className="text-amber-600/70 text-sm font-medium uppercase tracking-wide">{rest.cuisine}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedRestaurant(rest)}
                      className="mt-4 sm:mt-0 w-full sm:w-auto px-8 py-3 bg-stone-900 text-white rounded-2xl font-bold hover:bg-amber-600 transition-colors shadow-lg"
                    >
                      Enter Kitchen
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          // --- MENU DETAIL VIEW ---
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            className="max-w-4xl mx-auto px-4 pt-4"
          >
            {/* Header Card */}
            <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-xl mb-8">
              <img src="/image/menu.png" className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <button 
                onClick={() => setSelectedRestaurant(null)}
                className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-white/40 transition-all"
              >
                <ChevronLeft />
              </button>
              <div className="absolute bottom-8 left-8">
                <h2 className="text-4xl font-bold text-white mb-1">{selectedRestaurant.name}</h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-amber-500 text-xs font-bold text-white rounded-full uppercase">Menu Management</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="sticky top-4 z-20 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  placeholder="Find a dish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-amber-200 transition-all"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {["all", "veg", "non-veg"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold capitalize whitespace-nowrap transition-all ${
                      filter === f ? "bg-stone-900 text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
                <button 
                  onClick={() => { setEditingIndex("new"); setFormData({ name: "", price: "", type: "veg", description: "", image: "" }); }}
                  className="px-6 py-3 bg-amber-500 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-amber-600 shadow-lg shadow-amber-100"
                >
                  <Plus size={18} /> Add
                </button>
              </div>
            </div>

            {/* Menu List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {editingIndex === "new" && <EditForm isNew={true} key="new-form" />}
                {filteredMenu.length === 0 ? (
                  <motion.div className="text-center py-20 text-gray-400 italic">No dishes match your selection.</motion.div>
                ) : (
                  filteredMenu.map((item, idx) => (
                    <React.Fragment key={idx}>
                      {editingIndex === idx ? (
                        <EditForm isNew={false} />
                      ) : (
                        <MenuCard item={item} index={idx} />
                      )}
                    </React.Fragment>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyRestaurant;