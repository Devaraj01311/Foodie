import React, { useState } from "react";
import API from "../services/API";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { LogIn, UserCircle, ChefHat, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      toast.success("Welcome back!", {
        style: { background: "#1c1917", color: "#fff", borderRadius: "1rem" },
      });
      setTimeout(() => {
        navigate(data.user.role === "restaurant" || data.user.role === "admin" ? "/admin" : "/home");
      }, 800);
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async (role) => {
    const toastId = toast.loading(`Accessing as ${role}...`);
    try {
      const { data } = await API.post("/api/auth/guest-login", { role });
      localStorage.setItem("token", data.token);
      toast.success(`Guest Access Granted`, { id: toastId });
      setTimeout(() => navigate(role === "restaurant" ? "/admin" : "/home"), 800);
    } catch (err) {
      toast.error("Guest login failed", { id: toastId });
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
      >
        <header className="text-center mb-10">
          <h1 className="text-4xl font-serif italic font-bold text-stone-900 mb-1">Foodie<span className="text-amber-500">.</span></h1>
          <p className="text-stone-400 text-[10px] uppercase font-bold tracking-[0.3em]">Sign In</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1 border-b border-stone-100 focus-within:border-amber-500 transition-colors py-2">
            <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Email Address</p>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-stone-800 placeholder:text-stone-200"
              placeholder="Enter your email" required
            />
          </div>

          <div className="space-y-1 border-b border-stone-100 focus-within:border-amber-500 transition-colors py-2">
            <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Password</p>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-stone-800 placeholder:text-stone-200"
              placeholder="Enter password" required
            />
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" size="sm" className="text-xs text-stone-400 hover:text-amber-600 font-bold transition-colors">Forgot Password?</Link>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-4 bg-stone-900 hover:bg-amber-600 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? "Singing..." : <><LogIn size={18} /> Sign In</>}
          </button>
        </form>

        <div className="mt-10">
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-stone-100"></div>
            <span className="flex-shrink mx-4 text-stone-300 text-[10px] uppercase font-bold tracking-widest">Guest Entry</span>
            <div className="flex-grow border-t border-stone-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => handleGuestLogin("customer")} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-600 hover:text-amber-700 text-[10px] font-bold uppercase transition-all border border-stone-100">
              <UserCircle size={16} /> Customer
            </button>
            <button onClick={() => handleGuestLogin("restaurant")} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-600 hover:text-amber-700 text-[10px] font-bold uppercase transition-all border border-stone-100">
              <ChefHat size={16} /> Restaurant
            </button>
          </div>
        </div>

        <p className="text-center mt-10 text-stone-400 text-sm ">
          Not have Account? <Link to="/register" className="text-amber-600 font-sans not-italic font-bold hover:underline ml-1">Register Now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;