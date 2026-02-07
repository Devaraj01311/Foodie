import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { 
  Store, 
  Utensils, 
  Star, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  ChefHat, 
  Info,
  ArrowLeft,
  LayoutGrid
} from "lucide-react";
import API from "../services/API";
import RestaurantFooter from "../Components/RestaurantFooter";

const RestaurantAdmin = () => {
  const [restaurant, setRestaurant] = useState({
    name: "", cuisine: "", rating: "", image: "",
  });

  const [menu, setMenu] = useState([
    { name: "", price: "", type: "veg", description: "", image: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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
    setMenu((prev) => [...prev, { name: "", price: "", type: "veg", description: "", image: "" }]);
    toast.success("New slot added to menu", { icon: '✍️' });
  };

  const removeMenuItem = (index) => {
    if (menu.length === 1) return toast.error("Minimum one item required");
    setMenu((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!restaurant.name || !restaurant.cuisine || !restaurant.image) {
      return toast.error("Please complete restaurant profile");
    }
    setLoading(true);
    try {
      await API.post("/api/admin/restaurants", { ...restaurant, menu }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Establishment Created Successfully");
      setRestaurant({ name: "", cuisine: "", rating: "", image: "" });
      setMenu([{ name: "", price: "", type: "veg", description: "", image: "" }]);
    } catch (error) {
      toast.error("Process failed. Please check details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-800">
      <Toaster position="top-right" />
      
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline font-medium">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <LayoutGrid className="text-amber-600" size={20} />
            <h1 className="text-xl font-serif italic font-bold tracking-tight">Onboarding <span className="text-stone-400 font-sans not-italic font-light">Studio</span></h1>
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-amber-600 transition-all shadow-lg flex items-center gap-2"
          >
            {loading ? "Processing..." : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-8">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">Identity</h2>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100 space-y-6">
                <div className="group relative w-full aspect-square bg-stone-50 rounded-3xl overflow-hidden border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 hover:border-amber-400 transition-colors cursor-pointer">
                  {restaurant.image ? (
                    <img src={restaurant.image} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <>
                      <ImageIcon size={40} strokeWidth={1} />
                      <span className="text-xs mt-2 font-medium">Upload Cover</span>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="relative border-b border-stone-200 focus-within:border-amber-500 transition-colors py-2">
                    <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">Establishment Name</p>
                    <input 
                      type="text" name="name" value={restaurant.name} onChange={handleRestaurantChange}
                      className="w-full bg-transparent outline-none text-lg font-serif italic placeholder:text-stone-300" 
                      placeholder="The Royal Pavilion..."
                    />
                  </div>
                  
                  <div className="relative border-b border-stone-200 focus-within:border-amber-500 transition-colors py-2">
                    <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">Cuisine Specialty</p>
                    <input 
                      type="text" name="cuisine" value={restaurant.cuisine} onChange={handleRestaurantChange}
                      className="w-full bg-transparent outline-none font-medium placeholder:text-stone-300" 
                      placeholder="Modern European, Sushi..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 border-b border-stone-200 focus-within:border-amber-500 py-2 transition-colors">
                       <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">Rating</p>
                       <input 
                        type="number" name="rating" value={restaurant.rating} onChange={handleRestaurantChange}
                        className="w-full bg-transparent outline-none font-bold text-amber-600" placeholder="5.0"
                      />
                    </div>
                    <div className="flex-1 border-b border-stone-200 focus-within:border-amber-500 py-2 transition-colors">
                       <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">Status</p>
                       <div className="flex items-center gap-2 mt-1 text-green-600 font-bold text-xs uppercase tracking-wider">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* --- Right Column: Menu Builder --- */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Curated Menu</h2>
                <p className="text-xs text-stone-500 mt-1 italic font-serif">Define your signature dishes</p>
              </div>
              <button 
                onClick={addMenuItem}
                className="flex items-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-full text-xs font-bold transition-all active:scale-95"
              >
                <Plus size={16} /> Add Creation
              </button>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {menu.map((item, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[2rem] p-8 shadow-sm border border-stone-100 group hover:shadow-xl hover:shadow-stone-200/40 transition-all duration-500"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <select 
                          name="type" value={item.type} onChange={(e) => handleMenuChange(idx, e)}
                          className="text-[10px] uppercase font-bold tracking-widest text-stone-400 bg-stone-50 px-3 py-1 rounded-full outline-none appearance-none cursor-pointer"
                        >
                          <option value="veg">Vegetarian</option>
                          <option value="non-veg">Non-Vegetarian</option>
                        </select>
                      </div>
                      <button 
                        onClick={() => removeMenuItem(idx)}
                        className="p-2 text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-stone-400">Dish Title</p>
                        <input 
                          type="text" name="name" value={item.name} onChange={(e) => handleMenuChange(idx, e)}
                          className="w-full text-lg font-serif italic border-b border-transparent focus:border-stone-200 outline-none pb-1"
                          placeholder="Wild Mushroom Risotto"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-stone-400">Price (INR)</p>
                        <input 
                          type="number" name="price" value={item.price} onChange={(e) => handleMenuChange(idx, e)}
                          className="w-full text-lg font-bold text-amber-600 border-b border-transparent focus:border-stone-200 outline-none pb-1"
                          placeholder="₹ 0.00"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-1">
                        <p className="text-[10px] uppercase font-bold text-stone-400">Description</p>
                        <textarea 
                          rows="1" name="description" value={item.description} onChange={(e) => handleMenuChange(idx, e)}
                          className="w-full text-sm text-stone-500 italic border-b border-transparent focus:border-stone-200 outline-none pb-1 resize-none"
                          placeholder="Infused with truffle oil and served with aged parmesan..."
                        />
                      </div>

                      <div className="md:col-span-2 flex items-center gap-4 pt-2">
                        <div className="p-2 bg-stone-50 rounded-xl text-stone-400">
                          <ImageIcon size={16} />
                        </div>
                        <input 
                          type="text" name="image" value={item.image} onChange={(e) => handleMenuChange(idx, e)}
                          className="flex-1 text-[11px] font-mono text-stone-400 outline-none bg-transparent"
                          placeholder="Image URL (HTTPS)"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
              <button 
                onClick={handleSubmit}
                className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold shadow-2xl shadow-stone-400 flex justify-center items-center gap-2"
              >
                <Save size={18} /> Finish & Launch
              </button>
            </div>
          </div>
        </div>
      </main>

      <RestaurantFooter />
    </div>
  );
};

export default RestaurantAdmin;