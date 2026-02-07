import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu as MenuIcon, X, MapPin, LogOut, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/");
  };

  const navLinks = {
    main: [
      { name: "Home", path: "/home" },
      { name: "Restaurants", path: "/restaurants" },
      { name: "My Orders", path: "/orders" },
    ],
    admin: [
      { name: "Dashboard", path: "/admin" },
      { name: "Orders", path: "/admin/orders" },
      { name: "Manage Restaurants", path: "/admin/restaurants" },
    ]
  };

  const currentLinks = navLinks[type] || [];

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link to={token ? "/home" : "/"} className="flex flex-col group">
          <span className="text-2xl font-serif italic font-bold text-stone-900 tracking-tight">
            Foodie<span className="text-amber-500">.</span>
          </span>
          <div className="flex items-center text-[10px] text-stone-400 uppercase tracking-widest font-bold">
            <MapPin size={10} className="mr-1 text-amber-500" /> Bengaluru
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {currentLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs uppercase font-bold tracking-[0.2em] transition-colors ${
                location.pathname === link.path ? "text-amber-600" : "text-stone-400 hover:text-stone-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {type === "auth" ? (
            <div className="flex gap-4">
              <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 mt-2">Login</Link>
              <Link to="/register" className="bg-stone-900 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-amber-600 transition-all">Join</Link>
            </div>
          ) : (
            <>
              {type === "main" && token && (
                <Link to="/cart" className="relative p-2 text-stone-700 hover:text-amber-600 transition-colors">
                  <ShoppingBag size={22} />
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg ring-2 ring-white">
                      {cart.reduce((sum, item) => sum + item.qty, 0)}
                    </span>
                  )}
                </Link>
              )}
              
              {token && (
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 bg-stone-100 text-stone-900 px-5 py-2 rounded-full text-xs font-bold hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} /> Logout
                </button>
              )}

              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="lg:hidden p-2 text-stone-900"
              >
                {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </>
          )}
        </div>
      </div>
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-[110] lg:hidden"
      />
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed inset-y-0 right-0 w-72 bg-stone-900 text-stone-100 z-[120] p-8 shadow-2xl lg:hidden flex flex-col"
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-serif italic font-bold">Menu</h2>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 text-stone-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 space-y-2">
          {currentLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-4 group"
            >
              <span className="text-lg font-medium tracking-wide group-hover:text-amber-500 transition-colors">
                {link.name}
              </span>
              <ChevronRight size={18} className="text-stone-700 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
        <div className="mt-auto border-t border-stone-800 pt-6">
          {token && (
            <button
              onClick={handleLogout}
              className="w-full bg-stone-800 hover:bg-amber-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
          <p className="text-center text-[10px] uppercase tracking-widest text-stone-600 mt-6">
            Bengaluru • India
          </p>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </nav>
  );
};

export default Navbar;