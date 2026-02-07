import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { ChevronLeft, Search, Plus, Minus, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

const RestaurantMenu = ({ restaurant, onBack }) => {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredMenu = restaurant.menu.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "all" || item.type?.toLowerCase() === filter)
  );

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      <div className="relative h-[40vh] md:h-[50vh]">
        <img src={restaurant.image || "/image/restaurant.jpg"} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-4 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-white/40 transition-all"
        >
          <ChevronLeft />
        </button>
        <div className="absolute bottom-12 left-8 md:left-20">
          <h1 className="text-5xl md:text-7xl font-serif italic font-bold text-white mb-2">{restaurant.name}</h1>
          <p className="text-amber-400 font-bold tracking-[0.3em] uppercase text-xs">{restaurant.cuisine} • {restaurant.rating} Stars</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10 pb-20">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-stone-100 flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
            <input 
              placeholder="Search dishes..."
              className="w-full pl-12 pr-4 py-3 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-200 transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'veg', 'non-veg'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === f ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-400 hover:bg-stone-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {filteredMenu.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={idx} 
              className={`bg-white p-6 rounded-[2rem] border border-stone-100 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow ${!item.available ? 'opacity-50' : ''}`}
            >
              <div className="relative w-full md:w-44 h-44 shrink-0 overflow-hidden rounded-2xl">
                <img src={item.image} className="w-full h-full object-cover" alt="" />
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-[8px] font-bold uppercase tracking-tighter ${item.type === 'veg' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {item.type}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-serif italic font-bold text-stone-800 mb-1">{item.name}</h4>
                <p className="text-stone-400 text-sm mb-4 line-clamp-2 italic">{item.description}</p>
                <p className="text-xl font-bold text-amber-600">₹{item.price}</p>
              </div>

              <button
                disabled={!item.available}
                onClick={() => {
                  addToCart({ ...item, qty: 1 }, restaurant._id);
                  toast.success(`${item.name} added to cart`, {
                    style: { background: '#1c1917', color: '#fff', borderRadius: '1rem' }
                  });
                }}
                className="w-full md:w-auto px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors shadow-lg"
              >
                <Plus size={18} /> Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;