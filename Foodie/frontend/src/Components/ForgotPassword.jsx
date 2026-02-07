import React, { useState } from "react";
import API from "../services/API";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Send, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/api/auth/forgot-password", { email });
      toast.success("Recovery link sent to your inbox");
      setEmail("");
    } catch (err) {
      toast.error("Process failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image/login.jpeg')" }}
      />
      <div className="absolute inset-0 bg-black/60 z-1" />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl"
      >
        <Link to="/login" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-amber-600 transition-colors mb-10">
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
        
        <h2 className="text-3xl font-serif italic font-bold text-stone-900 mb-1">Forgot <span className="text-amber-500">Password</span></h2>
        <p className="text-stone-400 text-[10px] uppercase font-bold tracking-widest mb-10">Lost Account Access</p>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="border-b border-stone-100 focus-within:border-amber-500 py-2 transition-all">
            <p className="text-[10px] uppercase font-bold text-stone-400 mb-1 tracking-widest">Registered Email</p>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none font-medium text-stone-800"
              placeholder="Enter your email" required
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2"
          >
            <Send size={18} /> Send Recovery Link
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;