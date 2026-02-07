import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import RestaurantPage from "./restaurantpage";
import Contact from "./ContactPage";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-[#FDFCFB]"
    >
      <section className="px-4 py-4">
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden rounded-[2.5rem] bg-stone-900 shadow-2xl">
   
          <div className="absolute inset-0 opacity-40 bg-[url('/public/home.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent" />

          <div className="relative z-10 max-w-4xl px-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 border border-amber-500/30 rounded-full text-amber-400 text-[10px] uppercase tracking-[0.3em] font-bold backdrop-blur-md">
                Est. 2024 • Premium Delivery
              </span>
              <h1 className="text-4xl md:text-7xl font-serif italic font-bold text-white mb-6 leading-tight">
                Epicurean Delights <br /> 
                <span className="text-amber-400">At Your Doorstep</span>
              </h1>
              <p className="text-stone-300 text-lg md:text-xl mb-10 max-w-xl mx-auto font-light leading-relaxed">
                Experience the finest cuisine from Bengaluru's most prestigious kitchens, delivered with precision.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/restaurants"
                  className="w-full sm:w-auto bg-amber-500 text-stone-950 font-bold py-4 px-10 rounded-2xl shadow-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2 group"
                >
                  Explore Menus <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold py-4 px-10 rounded-2xl hover:bg-white/20 transition-all">
                  Our Story
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RestaurantPage /> 
      <div className="py-20">
        <Contact />
      </div>
      <Footer />
    </motion.div>
  );
};

export default Home;