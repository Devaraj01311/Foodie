import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  ClipboardList, 
  Utensils, 
  LogOut, 
  Menu, 
  X, 
  MapPin, 
  Info, 
  ShieldCheck 
} from "lucide-react";

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { path: "/admin", name: "Home", icon: <Home size={20} /> },
    { path: "/admin/orders", name: "Orders", icon: <ClipboardList size={20} /> },
    { path: "/admin/restaurants", name: "Restaurants", icon: <Utensils size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="mb-10 px-2">
        <h2 className="text-3xl font-serif italic font-bold text-stone-800">
          Foodie<span className="text-amber-500">.</span>
        </h2>
        <div className="flex items-center text-xs text-stone-400 mt-1 uppercase tracking-widest">
          <MapPin size={12} className="mr-1" /> Bengaluru
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive 
                ? "bg-stone-900 text-white shadow-lg shadow-stone-200" 
                : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info (Hidden on small mobile height if needed) */}
      <div className="mt-auto pt-8 border-t border-stone-100">
        <div className="space-y-6">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-stone-800 uppercase tracking-tighter">
              <Info size={14} /> About Us
            </h4>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Crafting premium culinary management experiences for modern restaurateurs.
            </p>
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-stone-800 uppercase tracking-tighter">
              <ShieldCheck size={14} /> Privacy
            </h4>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Your data security is our top priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-stone-100 p-8 flex-col sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* --- MOBILE/TABLET DRAWER --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 p-8 shadow-2xl lg:hidden"
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900"
              >
                <X size={24} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 bg-stone-100 rounded-xl text-stone-600"
            >
              <Menu size={20} />
            </button>
            <div className="lg:hidden">
              <h1 className="text-xl font-serif font-bold text-stone-800">Foodie<span className="text-amber-500">.</span></h1>
            </div>
            <div className="hidden lg:block">
               <h1 className="text-sm font-medium text-stone-400 uppercase tracking-[0.2em]">Dashboard Control</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-sm font-bold rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-stone-200"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;