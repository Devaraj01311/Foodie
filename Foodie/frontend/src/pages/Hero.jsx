import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function Hero() {
  return (
    <div className="relative h-[90vh] md:h-screen flex flex-col items-center justify-center text-center overflow-hidden m-2 md:m-4 rounded-[2.5rem] bg-stone-950 shadow-2xl">
      
      {/* 1. Cinematic Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/public/hero.png" 
          alt="Fine Dining" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl px-6">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-amber-200">
            Premium Gastronomy Service
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-serif italic font-bold text-white mb-6 leading-[1.1]"
        >
          Delicious Food, <br /> 
          <span className="text-amber-500">Delivered To You</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-stone-300 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Curating Bengaluru's finest culinary experiences, 
          brought directly to your private table.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Link
            to="/login"
            className="w-full sm:w-auto group bg-amber-500 text-stone-950 font-bold py-5 px-10 rounded-2xl shadow-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
          >
            Start Ordering <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/register"
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold py-5 px-10 rounded-2xl hover:bg-white/20 transition-all text-sm uppercase tracking-widest"
          >
            Create Account
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-950 to-transparent" />
    </div>
  );
}

export default Hero;